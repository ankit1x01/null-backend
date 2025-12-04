/**
 * EventSessionComments Module Routes
 * Defines all routes for event-session-comments operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// EventSessionComments routes
router.get('/getEventSessionComments', controller.getEventSessionComments);
router.get('/getEventSessionCommentById/:id', controller.getEventSessionCommentById);
router.post('/createEventSessionComment', controller.createEventSessionComment);
router.put('/updateEventSessionComment/:id', controller.updateEventSessionComment);
router.delete('/deleteEventSessionComment/:id', controller.deleteEventSessionComment);

module.exports = router;
