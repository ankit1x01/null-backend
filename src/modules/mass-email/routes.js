/**
 * Mass Email Routes
 * DISABLED: Feature not supported in current database schema
 */

const express = require('express');
const router = express.Router();
const { verifyToken: authenticate } = require('../../shared/middlewares/auth.middleware');

// All routes require authentication
router.use(authenticate);

const notImplemented = (req, res) => {
    res.status(503).json({
        error: 'Feature not available',
        message: 'Mass Email Campaigns are not supported in the current environment.'
    });
};

router.get('/templates', notImplemented);
router.get('/campaigns', notImplemented);
router.get('/campaigns/:id', notImplemented);
router.get('/campaigns/:id/stats', notImplemented);
router.post('/campaigns', notImplemented);
router.put('/campaigns/:id', notImplemented);
router.delete('/campaigns/:id', notImplemented);
router.get('/recipients/event/:eventId', notImplemented);
router.get('/recipients/chapter/:chapterId', notImplemented);
router.post('/campaigns/:id/recipients', notImplemented);
router.delete('/campaigns/:id/recipients/:recipientId', notImplemented);
router.post('/campaigns/:id/send', notImplemented);
router.post('/campaigns/:id/schedule', notImplemented);
router.post('/campaigns/:id/cancel-schedule', notImplemented);

module.exports = router;
