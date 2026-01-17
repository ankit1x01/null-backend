/**
 * Event Notifications Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All routes require authentication and admin privileges
router.use(jwt.verifyToken);
router.use(jwt.isAdmin);

// Get all notifications
router.get('/getNotifications', controller.getNotifications);

// Get notification by ID
router.get('/getNotificationById/:id', controller.getNotificationById);

// Get notifications by event
router.get('/getByEvent/:eventId', controller.getNotificationsByEvent);

// Create notification
router.post('/createNotification', controller.createNotification);

// Schedule notifications for an event
router.post('/scheduleForEvent/:eventId', controller.scheduleEventNotifications);

// Update notification
router.put('/updateNotification/:id', controller.updateNotification);

// Send a specific notification
router.post('/sendNotification/:id', controller.sendNotification);

// Process all pending notifications (called by cron)
router.post('/processPending', controller.processPendingNotifications);

// Cancel all notifications for an event
router.post('/cancelForEvent/:eventId', controller.cancelEventNotifications);

// Delete notification
router.delete('/deleteNotification/:id', controller.deleteNotification);

module.exports = router;
