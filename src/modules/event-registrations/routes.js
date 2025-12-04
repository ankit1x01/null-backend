/**
 * EventRegistrations Module Routes
 * Defines all routes for event-registrations operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// EventRegistrations routes
router.post('/createEventRegistration', controller.createEventRegistration);
router.get('/getEventRegistrations', controller.getEventRegistrations);
router.get('/getEventRegistrationById', controller.getEventRegistrationById);
router.put('/updateEventRegistration/:id', controller.updateEventRegistration);
router.delete('/deleteEventRegistration/:id', controller.deleteEventRegistration);

module.exports = router;
