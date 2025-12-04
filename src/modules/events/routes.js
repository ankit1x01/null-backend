/**
 * Events Module Routes
 * Defines all routes for events operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Events routes
router.get('/getEvents', controller.getEvents);
router.get('/getEventById', controller.getEventById);
router.post('/createEvent', controller.createEvent);
router.put('/updateEvent/:id', controller.updateEvent);
router.delete('/deleteEvent/:id', controller.deleteEvent);

module.exports = router;
