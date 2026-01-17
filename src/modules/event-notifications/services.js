/**
 * Event Notifications Services
 * Business logic for automated event notifications
 */
const db = require('../../shared/models');
const emailService = require('../../shared/services/email.service');

class EventNotificationService {
  /**
   * Get all notifications
   */
  async getAllNotifications(filters = {}) {
    const where = {};
    if (filters.event_id) where.event_id = filters.event_id;
    if (filters.notification_type) where.notification_type = filters.notification_type;
    if (filters.notification_state) where.notification_state = filters.notification_state;

    return await db.EventNotification.findAll({
      where,
      include: [
        { model: db.Event, as: 'event', attributes: ['id', 'name', 'start_time'] }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get notification by ID
   */
  async getNotificationById(id) {
    return await db.EventNotification.findByPk(id, {
      include: [
        { 
          model: db.Event, 
          as: 'event',
          include: [
            { model: db.Chapter, as: 'chapter' }
          ]
        }
      ]
    });
  }

  /**
   * Create notification
   */
  async createNotification(data) {
    return await db.EventNotification.create(data);
  }

  /**
   * Schedule notifications for an event
   */
  async scheduleEventNotifications(eventId) {
    const event = await db.Event.findByPk(eventId);
    if (!event) throw new Error('Event not found');

    const startTime = new Date(event.start_time);
    const notifications = [];

    // Announcement (immediately or 7 days before)
    const announcementDate = new Date(startTime);
    announcementDate.setDate(announcementDate.getDate() - 7);
    notifications.push({
      event_id: eventId,
      notification_type: 'announcement',
      notification_state: 'scheduled',
      scheduled_at: announcementDate > new Date() ? announcementDate : new Date(),
      channels: ['email', 'slack']
    });

    // Reminder 1 (2 days before)
    const reminder1Date = new Date(startTime);
    reminder1Date.setDate(reminder1Date.getDate() - 2);
    if (reminder1Date > new Date()) {
      notifications.push({
        event_id: eventId,
        notification_type: 'reminder_1',
        notification_state: 'scheduled',
        scheduled_at: reminder1Date,
        channels: ['email']
      });
    }

    // Reminder 2 (1 day before)
    const reminder2Date = new Date(startTime);
    reminder2Date.setDate(reminder2Date.getDate() - 1);
    if (reminder2Date > new Date()) {
      notifications.push({
        event_id: eventId,
        notification_type: 'reminder_2',
        notification_state: 'scheduled',
        scheduled_at: reminder2Date,
        channels: ['email', 'twitter']
      });
    }

    // Speaker notification
    notifications.push({
      event_id: eventId,
      notification_type: 'speaker_notification',
      notification_state: 'scheduled',
      scheduled_at: announcementDate > new Date() ? announcementDate : new Date(),
      channels: ['email']
    });

    // Create all notifications
    return await db.EventNotification.bulkCreate(notifications);
  }

  /**
   * Update notification
   */
  async updateNotification(id, data) {
    const notification = await db.EventNotification.findByPk(id);
    if (!notification) return null;
    await notification.update(data);
    return notification;
  }

  /**
   * Delete notification
   */
  async deleteNotification(id) {
    const notification = await db.EventNotification.findByPk(id);
    if (!notification) return false;
    await notification.destroy();
    return true;
  }

  /**
   * Process pending notifications (called by cron/scheduler)
   */
  async processPendingNotifications() {
    const pendingNotifications = await db.EventNotification.findAll({
      where: {
        notification_state: 'scheduled',
        scheduled_at: { [db.Sequelize.Op.lte]: new Date() }
      },
      include: [
        { 
          model: db.Event, 
          as: 'event',
          include: [
            { model: db.Chapter, as: 'chapter' },
            { model: db.EventRegistration, as: 'eventRegistrations', include: [{ model: db.User, as: 'user' }] },
            { model: db.EventSession, as: 'eventSessions', include: [{ model: db.User, as: 'user' }] }
          ]
        }
      ]
    });

    const results = [];
    for (const notification of pendingNotifications) {
      try {
        await this.sendNotification(notification);
        results.push({ id: notification.id, status: 'sent' });
      } catch (error) {
        results.push({ id: notification.id, status: 'failed', error: error.message });
      }
    }

    return results;
  }

  /**
   * Send a notification
   */
  async sendNotification(notification) {
    await notification.update({ notification_state: 'processing' });

    try {
      const event = notification.event;
      let recipientsCount = 0;

      // Get sessions with speakers
      const sessions = event.eventSessions?.map(s => ({
        id: s.id,
        name: s.name,
        start_time: s.start_time,
        speaker: s.user
      })) || [];

      // Get venue info
      const venue = event.venue;

      // Send based on notification type
      switch (notification.notification_type) {
        case 'announcement':
          // Send to all registrants
          for (const reg of (event.eventRegistrations || [])) {
            if (reg.user?.email) {
              try {
                await emailService.sendEventAnnouncement({
                  user: reg.user,
                  event,
                  eventType: event.event_type
                });
                recipientsCount++;
              } catch (e) { console.error('Failed to send announcement:', e); }
            }
          }
          break;

        case 'reminder_1':
        case 'reminder_2':
          // Send reminders to registrants
          for (const reg of (event.eventRegistrations || [])) {
            if (reg.user?.email) {
              try {
                await emailService.sendEventReminder({
                  user: reg.user,
                  event,
                  sessions,
                  venue
                });
                recipientsCount++;
              } catch (e) { console.error('Failed to send reminder:', e); }
            }
          }
          break;

        case 'speaker_notification':
          // Send to speakers
          for (const session of sessions) {
            if (session.speaker?.email) {
              try {
                await emailService.sendSpeakerNotification({
                  speaker: session.speaker,
                  session,
                  event
                });
                recipientsCount++;
              } catch (e) { console.error('Failed to send speaker notification:', e); }
            }
          }
          break;

        case 'speaker_reminder':
          // Send reminders to speakers
          for (const session of sessions) {
            if (session.speaker?.email) {
              try {
                await emailService.sendSpeakerReminder({
                  speaker: session.speaker,
                  session,
                  event
                });
                recipientsCount++;
              } catch (e) { console.error('Failed to send speaker reminder:', e); }
            }
          }
          break;

        case 'presentation_update':
          // Send presentation URL request to speakers
          for (const session of sessions) {
            if (session.speaker?.email) {
              try {
                await emailService.sendPresentationUpdateRequest({
                  speaker: session.speaker,
                  session,
                  event
                });
                recipientsCount++;
              } catch (e) { console.error('Failed to send presentation update:', e); }
            }
          }
          break;
      }

      await notification.update({
        notification_state: 'sent',
        sent_at: new Date(),
        recipients_count: recipientsCount,
        email_sent: notification.channels?.includes('email'),
        slack_sent: notification.channels?.includes('slack'),
        twitter_sent: notification.channels?.includes('twitter')
      });

      return notification;
    } catch (error) {
      await notification.update({
        notification_state: 'failed',
        error_message: error.message
      });
      throw error;
    }
  }

  /**
   * Get notifications by event
   */
  async getNotificationsByEvent(eventId) {
    return await db.EventNotification.findAll({
      where: { event_id: eventId },
      order: [['scheduled_at', 'ASC']]
    });
  }

  /**
   * Cancel all pending notifications for an event
   */
  async cancelEventNotifications(eventId) {
    return await db.EventNotification.update(
      { notification_state: 'cancelled' },
      { 
        where: { 
          event_id: eventId, 
          notification_state: { [db.Sequelize.Op.in]: ['pending', 'scheduled'] } 
        } 
      }
    );
  }
}

module.exports = new EventNotificationService();
