/**
 * EventRegistrations Module Routes
 * Defines all routes for event-registrations operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// EventRegistrations routes
router.post('/createEventRegistration', jwt.verifyToken, controller.createEventRegistration);
router.get('/getEventRegistrations', jwt.verifyToken, controller.getEventRegistrations);
router.get('/getEventRegistrationById', jwt.verifyToken, controller.getEventRegistrationById);
router.put('/updateEventRegistration/:id', jwt.verifyToken, controller.updateEventRegistration);
router.delete('/deleteEventRegistration/:id', jwt.verifyToken, jwt.isAdmin, controller.deleteEventRegistration);

module.exports = router;
