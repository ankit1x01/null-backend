/**
 * Leads Portal Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

const getMyChapters = async (req, res) => {
  try {
    const chapters = await service.getMyChapters(req.user.id);
    return successResponse(res, 'Chapters retrieved', chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return errorResponse(res, error.message, 500);
  }
};

const getMyEvents = async (req, res) => {
  try {
    const { status, upcoming, past, limit } = req.query;
    const events = await service.getMyEvents(req.user.id, {
      status,
      upcoming: upcoming === 'true',
      past: past === 'true',
      limit: limit ? parseInt(limit) : undefined
    });
    return successResponse(res, 'Events retrieved', events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return errorResponse(res, error.message, 500);
  }
};

const getMyStats = async (req, res) => {
  try {
    const stats = await service.getMyStats(req.user.id);
    return successResponse(res, 'Statistics retrieved', stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return errorResponse(res, error.message, 500);
  }
};

const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const registrations = await service.getEventRegistrations(req.user.id, eventId);
    if (registrations === null) {
      return errorResponse(res, 'Event not found or access denied', 404);
    }
    return successResponse(res, 'Registrations retrieved', registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return errorResponse(res, error.message, 500);
  }
};

const getEventSessions = async (req, res) => {
  try {
    const { eventId } = req.params;
    const sessions = await service.getEventSessions(req.user.id, eventId);
    if (sessions === null) {
      return errorResponse(res, 'Event not found or access denied', 404);
    }
    return successResponse(res, 'Sessions retrieved', sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return errorResponse(res, error.message, 500);
  }
};

const createEvent = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const event = await service.createEvent(req.user.id, chapterId, req.body);
    if (!event) {
      return errorResponse(res, 'Access denied - not a chapter lead', 403);
    }
    return successResponse(res, 'Event created', event, 201);
  } catch (error) {
    console.error('Error creating event:', error);
    return errorResponse(res, error.message, 400);
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await service.updateEvent(req.user.id, eventId, req.body);
    if (!event) {
      return errorResponse(res, 'Event not found or access denied', 404);
    }
    return successResponse(res, 'Event updated', event);
  } catch (error) {
    console.error('Error updating event:', error);
    return errorResponse(res, error.message, 400);
  }
};

const getEventsNeedingAttention = async (req, res) => {
  try {
    const events = await service.getEventsNeedingAttention(req.user.id);
    return successResponse(res, 'Events needing attention retrieved', events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return errorResponse(res, error.message, 500);
  }
};

const exportRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const data = await service.exportRegistrations(req.user.id, eventId);
    if (data === null) {
      return errorResponse(res, 'Event not found or access denied', 404);
    }

    // Convert to CSV
    if (data.length === 0) {
      return res.status(200).send('No registrations');
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(r => Object.values(r).join(','));
    const csv = [headers, ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=registrations-${eventId}.csv`);
    return res.send(csv);
  } catch (error) {
    console.error('Error exporting registrations:', error);
    return errorResponse(res, error.message, 500);
  }
};

const massUpdateRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { event_registrations } = req.body;

    if (!event_registrations || !Array.isArray(event_registrations)) {
      return errorResponse(res, 'event_registrations array is required', 400);
    }

    const result = await service.massUpdateRegistrations(req.user.id, eventId, event_registrations);

    if (!result.success) {
      return errorResponse(res, result.error, result.error.includes('denied') ? 403 : 404);
    }

    return res.json(result);
  } catch (error) {
    console.error('Error mass updating registrations:', error);
    return errorResponse(res, error.message, 500);
  }
};

const createEventSession = async (req, res) => {
  try {
    const { eventId } = req.params;
    const session = await service.createEventSession(req.user.id, eventId, req.body);
    if (!session) {
      return errorResponse(res, 'Event not found or access denied', 404);
    }
    return successResponse(res, 'Session created', session, 201);
  } catch (error) {
    console.error('Error creating session:', error);
    return errorResponse(res, error.message, 400);
  }
};

const updateEventSession = async (req, res) => {
  try {
    const { eventId, sessionId } = req.params;
    const session = await service.updateEventSession(req.user.id, eventId, sessionId, req.body);
    if (!session) {
      return errorResponse(res, 'Session not found or access denied', 404);
    }
    return successResponse(res, 'Session updated', session);
  } catch (error) {
    console.error('Error updating session:', error);
    return errorResponse(res, error.message, 400);
  }
};

const suggestUser = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    const users = await service.suggestUser(req.user.id, eventId, q);
    if (users === null) {
      return errorResponse(res, 'Event not found or access denied', 404);
    }
    return res.json(users);
  } catch (error) {
    console.error('Error suggesting users:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get event mailer tasks
 * Matches Rails: GET /leads/events/:event_id/event_mailer_tasks
 */
const getEventMailerTasks = async (req, res) => {
  try {
    const { eventId } = req.params;
    const tasks = await service.getEventMailerTasks(req.user.id, eventId);
    if (tasks === null) {
      return errorResponse(res, 'Event not found or access denied', 404);
    }
    return successResponse(res, 'Mailer tasks retrieved', tasks);
  } catch (error) {
    console.error('Error fetching mailer tasks:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get event mailer task by ID
 */
const getEventMailerTaskById = async (req, res) => {
  try {
    const { eventId, taskId } = req.params;
    const task = await service.getEventMailerTaskById(req.user.id, eventId, taskId);
    if (task === null) {
      return errorResponse(res, 'Task not found or access denied', 404);
    }
    return successResponse(res, 'Mailer task retrieved', task);
  } catch (error) {
    console.error('Error fetching mailer task:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Create event mailer task
 */
const createEventMailerTask = async (req, res) => {
  try {
    const { eventId } = req.params;
    const task = await service.createEventMailerTask(req.user.id, eventId, req.body);
    if (task === null) {
      return errorResponse(res, 'Event not found or access denied', 404);
    }
    return successResponse(res, 'Mailer task created', task, 201);
  } catch (error) {
    console.error('Error creating mailer task:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Update event mailer task
 */
const updateEventMailerTask = async (req, res) => {
  try {
    const { eventId, taskId } = req.params;
    const task = await service.updateEventMailerTask(req.user.id, eventId, taskId, req.body);
    if (task === null) {
      return errorResponse(res, 'Task not found or access denied', 404);
    }
    return successResponse(res, 'Mailer task updated', task);
  } catch (error) {
    console.error('Error updating mailer task:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Delete event mailer task
 */
const deleteEventMailerTask = async (req, res) => {
  try {
    const { eventId, taskId } = req.params;
    const result = await service.deleteEventMailerTask(req.user.id, eventId, taskId);
    if (result === null) {
      return errorResponse(res, 'Task not found or access denied', 404);
    }
    return successResponse(res, 'Mailer task deleted');
  } catch (error) {
    console.error('Error deleting mailer task:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Execute event mailer task
 * Matches Rails: GET /leads/events/:event_id/event_mailer_tasks/:id/execute
 */
const executeEventMailerTask = async (req, res) => {
  try {
    const { eventId, taskId } = req.params;
    const result = await service.executeEventMailerTask(req.user.id, eventId, taskId);
    if (result === null) {
      return errorResponse(res, 'Task not found or access denied', 404);
    }
    if (result.error) {
      return errorResponse(res, result.error, 400);
    }
    return successResponse(res, 'Mailer task executed', result);
  } catch (error) {
    console.error('Error executing mailer task:', error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getMyChapters,
  getMyEvents,
  getMyStats,
  getEventRegistrations,
  getEventSessions,
  createEvent,
  updateEvent,
  getEventsNeedingAttention,
  exportRegistrations,
  massUpdateRegistrations,
  createEventSession,
  updateEventSession,
  suggestUser,
  getEventMailerTasks,
  getEventMailerTaskById,
  createEventMailerTask,
  updateEventMailerTask,
  deleteEventMailerTask,
  executeEventMailerTask
};
