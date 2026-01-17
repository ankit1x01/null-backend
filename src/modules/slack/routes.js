/**
 * Slack Integration Routes
 */

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyToken: authenticate, isAdmin: authorize } = require('../../shared/middlewares/auth.middleware');

// Public Slackbot API (no auth required, uses Slack verification token)
router.post('/slackbot/events', controller.slackbotEvents);

// All other routes require authentication
router.use(authenticate);

// Get all integrations
router.get('/', controller.getIntegrations);

// Get integration by ID
router.get('/:id', controller.getIntegrationById);

// Get integration by chapter
router.get('/chapter/:chapterId', controller.getIntegrationByChapter);

// Get notification logs
router.get('/:id/logs', controller.getNotificationLogs);

// Create integration
router.post('/', controller.createIntegration);

// Update integration
router.put('/:id', controller.updateIntegration);

// Delete integration
router.delete('/:id', controller.deleteIntegration);

// Toggle active status
router.post('/:id/toggle', controller.toggleActive);

// Test webhook
router.post('/:id/test', controller.testWebhook);

// Notify endpoints (for internal/admin use)
router.post('/notify/event/:eventId', controller.notifyNewEvent);
router.post('/notify/event/:eventId/update', controller.notifyEventUpdate);
router.post('/notify/session/:sessionId', controller.notifyNewSession);

// Send custom notification
router.post('/:id/send', controller.sendCustomNotification);

// Retry failed notification
router.post('/logs/:logId/retry', controller.retryNotification);

module.exports = router;
