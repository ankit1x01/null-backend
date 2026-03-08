/**
 * Slack Integration Routes
 * DISABLED: Feature not supported in current database schema
 */

const express = require('express');
const router = express.Router();
const { verifyToken: authenticate } = require('../../shared/middlewares/auth.middleware');

// Public Slackbot API
router.post('/slackbot/events', (req, res) => res.status(503).json({ error: 'Slackbot not configured' }));

// All other routes require authentication
router.use(authenticate);

const notImplemented = (req, res) => {
    res.status(503).json({
        error: 'Feature not available',
        message: 'Slack Integration is not supported in the current environment.'
    });
};

router.get('/', notImplemented);
router.get('/:id', notImplemented);
router.get('/chapter/:chapterId', notImplemented);
router.get('/:id/logs', notImplemented);
router.post('/', notImplemented);
router.put('/:id', notImplemented);
router.delete('/:id', notImplemented);
router.post('/:id/toggle', notImplemented);
router.post('/:id/test', notImplemented);
router.post('/notify/event/:eventId', notImplemented);
router.post('/notify/event/:eventId/update', notImplemented);
router.post('/notify/session/:sessionId', notImplemented);
router.post('/:id/send', notImplemented);
router.post('/logs/:logId/retry', notImplemented);

module.exports = router;
