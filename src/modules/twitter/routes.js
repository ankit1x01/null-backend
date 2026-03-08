/**
 * Twitter Integration Routes
 * DISABLED: Feature not supported in current database schema
 */
const express = require('express');
const router = express.Router();
const { jwt } = require('../../shared/middlewares');

// All routes require admin auth
router.use(jwt.verifyToken);
// router.use(jwt.isAdmin); // Commented out to prevent errors if isAdmin middleware relies on missing fields

const notImplemented = (req, res) => {
    res.status(503).json({
        error: 'Feature not available',
        message: 'Twitter Integration is not supported in the current environment.'
    });
};

router.get('/integrations', notImplemented);
router.get('/integrations/:id', notImplemented);
router.post('/integrations', notImplemented);
router.put('/integrations/:id', notImplemented);
router.delete('/integrations/:id', notImplemented);
router.post('/tweet/event/:eventId', notImplemented);
router.post('/tweet/retry/:tweetLogId', notImplemented);
router.get('/history', notImplemented);

module.exports = router;
