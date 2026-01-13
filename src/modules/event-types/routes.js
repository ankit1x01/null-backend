/**
 * EventTypes Module Routes
 * Defines all routes for event-types operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const { jwt } = require('../../shared/middlewares');

// EventTypes routes
router.post('/createEventType', jwt.verifyToken, jwt.isAdmin, controller.createEventType);
router.get('/getEventTypes', controller.getEventTypes);
router.get('/getEventTypeById', controller.getEventTypeById);
router.put('/updateEventType/:id', jwt.verifyToken, jwt.isAdmin, controller.updateEventType);
router.delete('/deleteEventType/:id', jwt.verifyToken, jwt.isAdmin, controller.deleteEventType);

module.exports = router;
