/**
 * EventSessionComments Module Routes
 * Defines all routes for event-session-comments operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// EventSessionComments routes
router.get('/getEventSessionComments', controller.getEventSessionComments);
router.get('/getEventSessionCommentById/:id', controller.getEventSessionCommentById);
router.post('/createEventSessionComment', jwt.verifyToken, controller.createEventSessionComment);
router.put('/updateEventSessionComment/:id', jwt.verifyToken, controller.updateEventSessionComment);
router.delete('/deleteEventSessionComment/:id', jwt.verifyToken, controller.deleteEventSessionComment);

module.exports = router;
