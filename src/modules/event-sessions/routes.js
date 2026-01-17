/**
 * EventSessions Module Routes
 * Defines all routes for event-sessions operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const { jwt } = require('../../shared/middlewares');

// EventSessions routes
router.post('/createEventSession', jwt.verifyToken, jwt.isAdmin, controller.createEventSession);
router.get('/getEventSessions', controller.getEventSessions);
router.get('/getEventSessionById', controller.getEventSessionById);
router.put('/updateEventSession/:id', jwt.verifyToken, jwt.isAdmin, controller.updateEventSession);
router.delete('/deleteEventSession/:id', jwt.verifyToken, jwt.isAdmin, controller.deleteEventSession);

// Additional routes to match Rails API
router.get('/my-sessions', jwt.verifyToken, controller.getMySessions);
router.post('/:id/dislike', jwt.verifyToken, controller.dislikeSession);

module.exports = router;
