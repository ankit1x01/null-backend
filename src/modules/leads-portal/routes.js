/**
 * Leads Portal Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All routes require authentication
router.use(jwt.verifyToken);

// Dashboard
router.get('/chapters', controller.getMyChapters);
router.get('/events', controller.getMyEvents);
router.get('/stats', controller.getMyStats);
router.get('/attention', controller.getEventsNeedingAttention);

// Event management
router.post('/chapters/:chapterId/events', controller.createEvent);
router.put('/events/:eventId', controller.updateEvent);

// Event details
router.get('/events/:eventId/registrations', controller.getEventRegistrations);
router.get('/events/:eventId/sessions', controller.getEventSessions);
router.get('/events/:eventId/export', controller.exportRegistrations);

// Mass update registrations
router.put('/events/:eventId/registrations/mass-update', controller.massUpdateRegistrations);

// Session management
router.post('/events/:eventId/sessions', controller.createEventSession);
router.put('/events/:eventId/sessions/:sessionId', controller.updateEventSession);
router.get('/events/:eventId/sessions/suggest-user', controller.suggestUser);

// Event mailer tasks management (matches Rails: /leads/events/:event_id/event_mailer_tasks)
router.get('/events/:eventId/mailer-tasks', controller.getEventMailerTasks);
router.get('/events/:eventId/mailer-tasks/:taskId', controller.getEventMailerTaskById);
router.post('/events/:eventId/mailer-tasks', controller.createEventMailerTask);
router.put('/events/:eventId/mailer-tasks/:taskId', controller.updateEventMailerTask);
router.delete('/events/:eventId/mailer-tasks/:taskId', controller.deleteEventMailerTask);
router.post('/events/:eventId/mailer-tasks/:taskId/execute', controller.executeEventMailerTask);

module.exports = router;
