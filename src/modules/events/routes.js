/**
 * Events Module Routes
 * Defines all routes for events operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// Events routes
router.get('/getEvents', controller.getEvents);
router.get('/getEventById', controller.getEventById);
router.post('/createEvent', jwt.verifyToken, jwt.isAdmin, controller.createEvent);
router.put('/updateEvent/:id', jwt.verifyToken, jwt.isAdmin, controller.updateEvent);
router.delete('/deleteEvent/:id', jwt.verifyToken, jwt.isAdmin, controller.deleteEvent);
router.get('/:id/calendar.ics', controller.generateICS);

module.exports = router;
