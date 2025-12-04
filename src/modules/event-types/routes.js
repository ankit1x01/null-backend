/**
 * EventTypes Module Routes
 * Defines all routes for event-types operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// EventTypes routes
router.post('/createEventType', controller.createEventType);
router.get('/getEventTypes', controller.getEventTypes);
router.get('/getEventTypeById', controller.getEventTypeById);
router.put('/updateEventType/:id', controller.updateEventType);
router.delete('/deleteEventType/:id', controller.deleteEventType);

module.exports = router;
