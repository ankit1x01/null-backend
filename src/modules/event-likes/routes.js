/**
 * Event Likes Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All routes require authentication
router.use(jwt.verifyToken);

// Get user's own likes
router.get('/myLikes', controller.getUserLikes);

// Get likes for a session
router.get('/session/:sessionId', controller.getSessionLikes);

// Get like counts for a session
router.get('/session/:sessionId/counts', controller.getSessionLikeCounts);

// Get user's like for a specific session
router.get('/session/:sessionId/myLike', controller.getUserSessionLike);

// Toggle like on a session
router.post('/session/:sessionId/toggle', controller.toggleLike);

// Add like to a session
router.post('/session/:sessionId', controller.addLike);

// Remove like from a session
router.delete('/session/:sessionId', controller.removeLike);

// Get top liked sessions for an event
router.get('/event/:eventId/topSessions', controller.getTopLikedSessions);

// Get event engagement statistics
router.get('/event/:eventId/engagement', controller.getEventEngagement);

// Batch operations
router.post('/sessions/reactions', controller.getSessionsReactions);
router.post('/sessions/myLikes', controller.getUserLikesForSessions);

module.exports = router;
