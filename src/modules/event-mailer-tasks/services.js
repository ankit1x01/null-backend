/**
 * Event Mailer Tasks Services
 * Business logic for mass email functionality
 */
const db = require('../../shared/models');
const emailService = require('../../shared/services/email.service');

class EventMailerTaskService {
  /**
   * Get all mailer tasks
   */
  async getAllMailerTasks(filters = {}) {
    const where = {};
    if (filters.event_id) where.event_id = filters.event_id;
    if (filters.status) where.status = filters.status;
    if (filters.executed !== undefined) where.executed = filters.executed;

    return await db.EventMailerTask.findAll({
      where,
      include: [
        { model: db.Event, as: 'event', attributes: ['id', 'name'] },
        { model: db.User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get mailer task by ID
   */
  async getMailerTaskById(id) {
    return await db.EventMailerTask.findByPk(id, {
      include: [
        { 
          model: db.Event, 
          as: 'event',
          include: [
            { model: db.Chapter, as: 'chapter' }
          ]
        },
        { model: db.User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ]
    });
  }

  /**
   * Create a new mailer task
   */
  async createMailerTask(data, userId) {
    // Count potential recipients
    const recipientsCount = await this.countRecipients(data.event_id, data.registration_state);

    return await db.EventMailerTask.create({
      ...data,
      created_by: userId,
      recipients_count: recipientsCount,
      status: 'pending'
    });
  }

  /**
   * Update mailer task
   */
  async updateMailerTask(id, data) {
    const task = await db.EventMailerTask.findByPk(id);
    if (!task) return null;
    if (task.executed) {
      throw new Error('Cannot update an executed task');
    }
    
    // Recalculate recipients if filters changed
    if (data.event_id || data.registration_state !== undefined) {
      data.recipients_count = await this.countRecipients(
        data.event_id || task.event_id,
        data.registration_state !== undefined ? data.registration_state : task.registration_state
      );
    }

    await task.update(data);
    return task;
  }

  /**
   * Delete mailer task
   */
  async deleteMailerTask(id) {
    const task = await db.EventMailerTask.findByPk(id);
    if (!task) return false;
    if (task.executed) {
      throw new Error('Cannot delete an executed task');
    }
    await task.destroy();
    return true;
  }

  /**
   * Execute mailer task - send emails
   */
  async executeMailerTask(id) {
    const task = await db.EventMailerTask.findByPk(id, {
      include: [{ model: db.Event, as: 'event' }]
    });

    if (!task) throw new Error('Task not found');
    if (task.executed) throw new Error('Task already executed');
    if (!task.ready_for_delivery) throw new Error('Task not ready for delivery');

    // Update status to processing
    await task.update({ status: 'processing' });

    try {
      // Get recipients
      const users = await this.getRecipients(task.event_id, task.registration_state);
      
      let sentCount = 0;
      let failedCount = 0;

      // Send emails using email service
      for (const user of users) {
        try {
          await emailService.sendCustomEmail({
            user,
            subject: task.subject,
            body: task.body
          });
          sentCount++;
        } catch (error) {
          failedCount++;
          console.error(`Failed to send email to ${user.email}:`, error);
        }
      }

      await task.update({
        executed: true,
        status: 'completed',
        sent_count: sentCount,
        failed_count: failedCount,
        executed_at: new Date()
      });

      return task;
    } catch (error) {
      await task.update({
        status: 'failed',
        error_message: error.message
      });
      throw error;
    }
  }

  /**
   * Count potential recipients
   */
  async countRecipients(eventId, registrationState) {
    const where = { event_id: eventId };
    if (registrationState) where.state = registrationState;

    return await db.EventRegistration.count({ where });
  }

  /**
   * Get recipients list
   */
  async getRecipients(eventId, registrationState) {
    const where = { event_id: eventId };
    if (registrationState) where.state = registrationState;

    const registrations = await db.EventRegistration.findAll({
      where,
      include: [{ model: db.User, as: 'user', attributes: ['id', 'name', 'email'] }]
    });

    return registrations.map(r => r.user).filter(u => u && u.email);
  }

  /**
   * Preview recipients
   */
  async previewRecipients(eventId, registrationState, limit = 10) {
    const users = await this.getRecipients(eventId, registrationState);
    return {
      total: users.length,
      preview: users.slice(0, limit).map(u => ({ id: u.id, name: u.name, email: u.email }))
    };
  }
}

module.exports = new EventMailerTaskService();
