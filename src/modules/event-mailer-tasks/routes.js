/**
 * Event Mailer Tasks Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All routes require authentication and admin privileges
router.use(jwt.verifyToken);
router.use(jwt.isAdmin);

// Get all mailer tasks
router.get('/getMailerTasks', controller.getMailerTasks);

// Get mailer task by ID
router.get('/getMailerTaskById/:id', controller.getMailerTaskById);

// Preview recipients
router.get('/previewRecipients', controller.previewRecipients);

// Create mailer task
router.post('/createMailerTask', controller.createMailerTask);

// Update mailer task
router.put('/updateMailerTask/:id', controller.updateMailerTask);

// Execute mailer task (send emails)
router.post('/executeMailerTask/:id', controller.executeMailerTask);

// Delete mailer task
router.delete('/deleteMailerTask/:id', controller.deleteMailerTask);

module.exports = router;
