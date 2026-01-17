/**
 * Leads Portal Services
 * Dashboard for chapter leads to manage their chapters and events
 */
const db = require('../../shared/models');
const { Op } = require('sequelize');

class LeadsPortalService {
  /**
   * Get chapters led by user
   */
  async getMyChapters(userId) {
    const leads = await db.ChapterLead.findAll({
      where: { user_id: userId },
      include: [{
        model: db.Chapter,
        as: 'chapter',
        include: [{
          model: db.Event,
          as: 'events',
          limit: 5,
          order: [['start_time', 'DESC']]
        }]
      }]
    });
    return leads.map(l => l.chapter);
  }

  /**
   * Get events for chapters led by user
   */
  async getMyEvents(userId, filters = {}) {
    const chapters = await this.getMyChapters(userId);
    const chapterIds = chapters.map(c => c.id);

    if (chapterIds.length === 0) return [];

    const where = { chapter_id: { [Op.in]: chapterIds } };
    if (filters.status) where.status = filters.status;
    if (filters.upcoming) where.start_time = { [Op.gte]: new Date() };
    if (filters.past) where.start_time = { [Op.lt]: new Date() };

    return await db.Event.findAll({
      where,
      include: [
        { model: db.Chapter, as: 'chapter' },
        { model: db.EventType, as: 'eventType' },
        { model: db.Venue, as: 'venue' }
      ],
      order: [['start_time', 'DESC']],
      limit: filters.limit || 50
    });
  }

  /**
   * Get event statistics for chapter lead
   */
  async getMyStats(userId) {
    const chapters = await this.getMyChapters(userId);
    const chapterIds = chapters.map(c => c.id);

    if (chapterIds.length === 0) {
      return { chapters: 0, events: 0, registrations: 0, sessions: 0 };
    }

    const [eventsCount, registrationsCount, sessionsCount] = await Promise.all([
      db.Event.count({ where: { chapter_id: { [Op.in]: chapterIds } } }),
      db.EventRegistration.count({
        include: [{
          model: db.Event,
          as: 'event',
          where: { chapter_id: { [Op.in]: chapterIds } },
          required: true
        }]
      }),
      db.EventSession.count({
        include: [{
          model: db.Event,
          as: 'event',
          where: { chapter_id: { [Op.in]: chapterIds } },
          required: true
        }]
      })
    ]);

    return {
      chapters: chapters.length,
      events: eventsCount,
      registrations: registrationsCount,
      sessions: sessionsCount
    };
  }

  /**
   * Get registrations for an event (lead must own chapter)
   */
  async getEventRegistrations(userId, eventId) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    return await db.EventRegistration.findAll({
      where: { event_id: eventId },
      include: [{ model: db.User, as: 'user' }],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get sessions for an event
   */
  async getEventSessions(userId, eventId) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    return await db.EventSession.findAll({
      where: { event_id: eventId },
      include: [{ model: db.User, as: 'user' }],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Create event for chapter
   */
  async createEvent(userId, chapterId, eventData) {
    const isLead = await this.isChapterLead(userId, chapterId);
    if (!isLead) return null;

    return await db.Event.create({
      ...eventData,
      chapter_id: chapterId
    });
  }

  /**
   * Update event (lead must own chapter)
   */
  async updateEvent(userId, eventId, eventData) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    await event.update(eventData);
    return event;
  }

  /**
   * Check if user is chapter lead
   */
  async isChapterLead(userId, chapterId) {
    const lead = await db.ChapterLead.findOne({
      where: { user_id: userId, chapter_id: chapterId }
    });
    return !!lead;
  }

  /**
   * Get upcoming events needing attention
   */
  async getEventsNeedingAttention(userId) {
    const chapters = await this.getMyChapters(userId);
    const chapterIds = chapters.map(c => c.id);

    if (chapterIds.length === 0) return [];

    // Events in next 7 days with low registrations
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return await db.Event.findAll({
      where: {
        chapter_id: { [Op.in]: chapterIds },
        start_time: { [Op.between]: [new Date(), nextWeek] }
      },
      include: [
        { model: db.Chapter, as: 'chapter' },
        { model: db.EventRegistration, as: 'eventRegistrations' }
      ],
      order: [['start_time', 'ASC']]
    });
  }

  /**
   * Export registrations as CSV data
   */
  async exportRegistrations(userId, eventId) {
    const registrations = await this.getEventRegistrations(userId, eventId);
    if (!registrations) return null;

    return registrations.map(r => ({
      id: r.id,
      name: r.user?.name || 'N/A',
      email: r.user?.email || 'N/A',
      status: r.status,
      state: r.state,
      registration_date: r.created_at
    }));
  }

  /**
   * Mass update registration states
   * @param {number} userId - User ID (must be chapter lead)
   * @param {number} eventId - Event ID
   * @param {Array} updates - Array of {id, state} objects
   */
  async massUpdateRegistrations(userId, eventId, updates) {
    const event = await db.Event.findByPk(eventId);
    if (!event) {
      return { success: false, error: 'Event not found' };
    }

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) {
      return { success: false, error: 'Access denied - not a chapter lead' };
    }

    const results = {
      success: [],
      errors: []
    };

    for (const update of updates) {
      try {
        const registration = await db.EventRegistration.findOne({
          where: { id: update.id, event_id: eventId }
        });

        if (!registration) {
          results.errors.push({
            registration_id: update.id,
            error_message: 'Registration not found'
          });
          continue;
        }

        // Valid states
        const validStates = ['pending', 'confirmed', 'cancelled', 'waitlisted', 'attended', 'no_show'];
        if (!validStates.includes(update.state)) {
          results.errors.push({
            registration_id: update.id,
            error_message: `Invalid state: ${update.state}`
          });
          continue;
        }

        await registration.update({ state: update.state });
        results.success.push(update.id);
      } catch (error) {
        results.errors.push({
          registration_id: update.id,
          error_message: error.message
        });
      }
    }

    return {
      success: true,
      status: results.errors.length === 0 ? 'OK' : 'PARTIAL',
      updated: results.success.length,
      failed: results.errors.length,
      errors: results.errors
    };
  }

  /**
   * Create event session
   */
  async createEventSession(userId, eventId, sessionData) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    return await db.EventSession.create({
      ...sessionData,
      event_id: eventId
    });
  }

  /**
   * Update event session
   */
  async updateEventSession(userId, eventId, sessionId, sessionData) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    const session = await db.EventSession.findOne({
      where: { id: sessionId, event_id: eventId }
    });

    if (!session) return null;

    // Remove event_id from updates to prevent changing it
    delete sessionData.event_id;

    await session.update(sessionData);
    return session;
  }

  /**
   * Suggest user for speaker selection
   */
  async suggestUser(userId, eventId, query) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    const users = await db.User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } }
        ]
      },
      attributes: ['id', 'name', 'email'],
      limit: 5
    });

    return users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email
    }));
  }

  /**
   * Get event mailer tasks
   * Matches Rails: GET /leads/events/:event_id/event_mailer_tasks
   */
  async getEventMailerTasks(userId, eventId) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    return await db.EventMailerTask.findAll({
      where: { event_id: eventId },
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get event mailer task by ID
   */
  async getEventMailerTaskById(userId, eventId, taskId) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    return await db.EventMailerTask.findOne({
      where: { id: taskId, event_id: eventId }
    });
  }

  /**
   * Create event mailer task
   */
  async createEventMailerTask(userId, eventId, taskData) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    return await db.EventMailerTask.create({
      ...taskData,
      event_id: eventId
    });
  }

  /**
   * Update event mailer task
   */
  async updateEventMailerTask(userId, eventId, taskId, taskData) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    const task = await db.EventMailerTask.findOne({
      where: { id: taskId, event_id: eventId }
    });

    if (!task) return null;

    // Prevent updating event_id
    delete taskData.event_id;

    await task.update(taskData);
    return task;
  }

  /**
   * Delete event mailer task
   */
  async deleteEventMailerTask(userId, eventId, taskId) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    const task = await db.EventMailerTask.findOne({
      where: { id: taskId, event_id: eventId }
    });

    if (!task) return null;

    await task.destroy();
    return { deleted: true };
  }

  /**
   * Execute event mailer task
   * Matches Rails: GET /leads/events/:event_id/event_mailer_tasks/:id/execute
   */
  async executeEventMailerTask(userId, eventId, taskId) {
    const event = await db.Event.findByPk(eventId);
    if (!event) return null;

    const isLead = await this.isChapterLead(userId, event.chapter_id);
    if (!isLead) return null;

    const task = await db.EventMailerTask.findOne({
      where: { id: taskId, event_id: eventId }
    });

    if (!task) return null;

    // Check if already executed
    if (task.executed) {
      return { error: 'Task has already been executed' };
    }

    // Check if ready for delivery
    if (!task.ready_for_delivery) {
      return { error: 'Task is not ready for delivery' };
    }

    // Mark as executed (actual email sending would be handled by a separate job/service)
    await task.update({
      executed: true,
      executed_at: new Date(),
      status: 'executed'
    });

    return {
      executed: true,
      task_id: task.id,
      message: 'Mailer task has been queued for execution'
    };
  }
}

module.exports = new LeadsPortalService();
