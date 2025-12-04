/**
 * EventSessions Module Routes
 * Defines all routes for event-sessions operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// EventSessions routes
router.post('/createEventSession', controller.createEventSession);
router.get('/getEventSessions', controller.getEventSessions);
router.get('/getEventSessionById', controller.getEventSessionById);
router.put('/updateEventSession/:id', controller.updateEventSession);
router.delete('/deleteEventSession/:id', controller.deleteEventSession);

module.exports = router;
