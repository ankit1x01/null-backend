/**
 * Slack Integration Services
 * Handles Slack notifications and webhooks
 */

const db = require('../../shared/models');
const { Op } = require('sequelize');

class SlackIntegrationService {
  /**
   * Search events by chapter name (Slackbot API)
   * @param {string} chapterName - Chapter name to search for
   * @param {string} token - Slack verification token
   */
  async searchEventsByChapter(chapterName, token) {
    // Verify Slack token
    const expectedToken = process.env.SLACK_VERIFICATION_TOKEN;
    if (expectedToken && token !== expectedToken) {
      return { error: 'Failed to verify slack token' };
    }

    if (!chapterName || !chapterName.trim()) {
      return {
        text: "I cannot search without a chapter name ¯\\_(ツ)_/¯",
        attachments: []
      };
    }

    // Find chapter (case insensitive)
    const chapter = await db.Chapter.findOne({
      where: db.Sequelize.where(
        db.Sequelize.fn('LOWER', db.Sequelize.col('name')),
        chapterName.toLowerCase().trim()
      )
    });

    if (!chapter) {
      return {
        text: "I cannot find the chapter you are looking for ¯\\_(ツ)_/¯",
        attachments: []
      };
    }

    // Get future public events
    const events = await db.Event.findAll({
      where: {
        chapter_id: chapter.id,
        public: true,
        end_time: { [Op.gt]: new Date() }
      },
      include: [
        { model: db.Venue, as: 'venue', attributes: ['name'] }
      ],
      order: [['start_time', 'ASC']],
      limit: 10
    });

    return {
      text: `I found ${events.length} event(s) scheduled for ${chapter.name} chapter`,
      attachments: events.map(e => ({
        text: `${e.name} - ${new Date(e.start_time).toLocaleDateString()}`,
        fields: [
          { title: 'Date', value: new Date(e.start_time).toLocaleDateString(), short: true },
          { title: 'Venue', value: e.venue?.name || 'TBA', short: true }
        ]
      }))
    };
  }

  /**
   * Get all Slack integrations
   */
  async getIntegrations(filters = {}) {
    const where = {};

    if (filters.chapter_id) {
      where.chapter_id = filters.chapter_id;
    }

    if (filters.is_active !== undefined) {
      where.is_active = filters.is_active;
    }

    const integrations = await db.SlackIntegration.findAll({
      where,
      include: [
        { model: db.Chapter, as: 'chapter', attributes: ['id', 'name', 'slug'] }
      ],
      order: [['created_at', 'DESC']]
    });

    return integrations;
  }

  /**
   * Get integration by ID
   */
  async getIntegrationById(id) {
    const integration = await db.SlackIntegration.findByPk(id, {
      include: [
        { model: db.Chapter, as: 'chapter' }
      ]
    });

    if (!integration) {
      throw new Error('Integration not found');
    }

    return integration;
  }

  /**
   * Get integration by chapter ID
   */
  async getIntegrationByChapter(chapterId) {
    const integration = await db.SlackIntegration.findOne({
      where: { chapter_id: chapterId },
      include: [
        { model: db.Chapter, as: 'chapter' }
      ]
    });

    return integration;
  }

  /**
   * Create Slack integration
   */
  async createIntegration(data) {
    // Check if chapter already has integration
    const existing = await db.SlackIntegration.findOne({
      where: { chapter_id: data.chapter_id }
    });

    if (existing) {
      throw new Error('Chapter already has a Slack integration');
    }

    const integration = await db.SlackIntegration.create({
      chapter_id: data.chapter_id,
      webhook_url: data.webhook_url,
      channel_name: data.channel_name,
      bot_token: data.bot_token,
      is_active: true,
      notify_new_events: data.notify_new_events ?? true,
      notify_event_updates: data.notify_event_updates ?? true,
      notify_registrations: data.notify_registrations ?? false,
      notify_new_sessions: data.notify_new_sessions ?? true
    });

    return integration;
  }

  /**
   * Update Slack integration
   */
  async updateIntegration(id, data) {
    const integration = await db.SlackIntegration.findByPk(id);

    if (!integration) {
      throw new Error('Integration not found');
    }

    await integration.update(data);
    return integration;
  }

  /**
   * Delete Slack integration
   */
  async deleteIntegration(id) {
    const integration = await db.SlackIntegration.findByPk(id);

    if (!integration) {
      throw new Error('Integration not found');
    }

    // Delete notification logs
    await db.SlackNotificationLog.destroy({ where: { integration_id: id } });
    await integration.destroy();

    return { message: 'Integration deleted successfully' };
  }

  /**
   * Toggle integration active status
   */
  async toggleActive(id) {
    const integration = await db.SlackIntegration.findByPk(id);

    if (!integration) {
      throw new Error('Integration not found');
    }

    await integration.update({ is_active: !integration.is_active });
    return integration;
  }

  /**
   * Test Slack webhook
   */
  async testWebhook(id) {
    const integration = await db.SlackIntegration.findByPk(id, {
      include: [{ model: db.Chapter, as: 'chapter' }]
    });

    if (!integration) {
      throw new Error('Integration not found');
    }

    const message = {
      text: `🔔 Test notification from null Community`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Test Notification*\n\nThis is a test message from the null community platform for *${integration.chapter?.name || 'your chapter'}*.`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `✅ Slack integration is working correctly!`
            }
          ]
        }
      ]
    };

    const result = await this.sendSlackMessage(integration.webhook_url, message);

    // Log the test
    await this.logNotification(id, 'test', null, result.success, result.error);

    return result;
  }

  /**
   * Send Slack message via webhook
   */
  async sendSlackMessage(webhookUrl, message) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Slack API error: ${text}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Slack message error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Notify about new event
   */
  async notifyNewEvent(eventId) {
    const event = await db.Event.findByPk(eventId, {
      include: [
        { model: db.Chapter, as: 'chapter' },
        { model: db.Venue, as: 'venue' }
      ]
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const integration = await this.getIntegrationByChapter(event.chapter_id);

    if (!integration || !integration.is_active || !integration.notify_new_events) {
      return { skipped: true, reason: 'Notifications disabled' };
    }

    const eventDate = new Date(event.start_time).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const message = {
      text: `🎉 New Event: ${event.name}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎉 New Event Announced!'
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${event.name}*\n\n${event.description?.substring(0, 200) || 'No description'}...`
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*📅 Date:*\n${eventDate}`
            },
            {
              type: 'mrkdwn',
              text: `*📍 Venue:*\n${event.venue?.name || event.venue_type || 'TBA'}`
            }
          ]
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Event'
              },
              url: `${process.env.FRONTEND_URL || 'https://null.community'}/events/${event.id}`,
              action_id: 'view_event'
            }
          ]
        }
      ]
    };

    const result = await this.sendSlackMessage(integration.webhook_url, message);
    await this.logNotification(integration.id, 'new_event', eventId, result.success, result.error);

    return result;
  }

  /**
   * Notify about event update
   */
  async notifyEventUpdate(eventId, updateType = 'general') {
    const event = await db.Event.findByPk(eventId, {
      include: [{ model: db.Chapter, as: 'chapter' }]
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const integration = await this.getIntegrationByChapter(event.chapter_id);

    if (!integration || !integration.is_active || !integration.notify_event_updates) {
      return { skipped: true, reason: 'Notifications disabled' };
    }

    const updateMessages = {
      general: '📝 Event details have been updated',
      cancelled: '❌ Event has been cancelled',
      rescheduled: '🔄 Event has been rescheduled',
      venue_changed: '📍 Event venue has changed'
    };

    const message = {
      text: `Event Update: ${event.name}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Event Update*\n\n${updateMessages[updateType] || updateMessages.general}\n\n*${event.name}*`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Details'
              },
              url: `${process.env.FRONTEND_URL || 'https://null.community'}/events/${event.id}`,
              action_id: 'view_event'
            }
          ]
        }
      ]
    };

    const result = await this.sendSlackMessage(integration.webhook_url, message);
    await this.logNotification(integration.id, 'event_update', eventId, result.success, result.error);

    return result;
  }

  /**
   * Notify about new session
   */
  async notifyNewSession(sessionId) {
    const session = await db.EventSession.findByPk(sessionId, {
      include: [
        {
          model: db.Event,
          as: 'event',
          include: [{ model: db.Chapter, as: 'chapter' }]
        },
        { model: db.User, as: 'speaker' }
      ]
    });

    if (!session || !session.event) {
      throw new Error('Session not found');
    }

    const integration = await this.getIntegrationByChapter(session.event.chapter_id);

    if (!integration || !integration.is_active || !integration.notify_new_sessions) {
      return { skipped: true, reason: 'Notifications disabled' };
    }

    const message = {
      text: `📣 New Session: ${session.title}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*📣 New Session Added*\n\n*${session.title}*\nby ${session.speaker?.name || 'TBA'}\n\nEvent: ${session.event.name}`
          }
        }
      ]
    };

    const result = await this.sendSlackMessage(integration.webhook_url, message);
    await this.logNotification(integration.id, 'new_session', sessionId, result.success, result.error);

    return result;
  }

  /**
   * Send custom notification
   */
  async sendCustomNotification(integrationId, message) {
    const integration = await db.SlackIntegration.findByPk(integrationId);

    if (!integration) {
      throw new Error('Integration not found');
    }

    if (!integration.is_active) {
      throw new Error('Integration is not active');
    }

    const slackMessage = {
      text: message.text,
      blocks: message.blocks || [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message.text
          }
        }
      ]
    };

    const result = await this.sendSlackMessage(integration.webhook_url, slackMessage);
    await this.logNotification(integration.id, 'custom', null, result.success, result.error);

    return result;
  }

  /**
   * Log notification
   */
  async logNotification(integrationId, type, referenceId, success, error = null) {
    await db.SlackNotificationLog.create({
      integration_id: integrationId,
      notification_type: type,
      reference_id: referenceId,
      status: success ? 'sent' : 'failed',
      error_message: error
    });
  }

  /**
   * Get notification logs
   */
  async getNotificationLogs(integrationId, page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    const { count, rows } = await db.SlackNotificationLog.findAndCountAll({
      where: { integration_id: integrationId },
      order: [['created_at', 'DESC']],
      limit,
      offset
    });

    return {
      logs: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  /**
   * Retry failed notification
   */
  async retryNotification(logId) {
    const log = await db.SlackNotificationLog.findByPk(logId, {
      include: [{ model: db.SlackIntegration, as: 'integration' }]
    });

    if (!log) {
      throw new Error('Log not found');
    }

    if (log.status !== 'failed') {
      throw new Error('Only failed notifications can be retried');
    }

    // Retry based on notification type
    let result;
    switch (log.notification_type) {
      case 'new_event':
        result = await this.notifyNewEvent(log.reference_id);
        break;
      case 'event_update':
        result = await this.notifyEventUpdate(log.reference_id);
        break;
      case 'new_session':
        result = await this.notifyNewSession(log.reference_id);
        break;
      case 'test':
        result = await this.testWebhook(log.integration_id);
        break;
      default:
        throw new Error('Cannot retry this notification type');
    }

    return result;
  }
}

module.exports = new SlackIntegrationService();
