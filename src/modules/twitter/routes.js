/**
 * Twitter Integration Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All routes require admin auth
router.use(jwt.verifyToken);
router.use(jwt.isAdmin);

// Integration management
router.get('/integrations', controller.getIntegrations);
router.get('/integrations/:id', controller.getIntegrationById);
router.post('/integrations', controller.createIntegration);
router.put('/integrations/:id', controller.updateIntegration);
router.delete('/integrations/:id', controller.deleteIntegration);

// Tweeting
router.post('/tweet/event/:eventId', controller.tweetEvent);
router.post('/tweet/retry/:tweetLogId', controller.retryTweet);
router.get('/history', controller.getTweetHistory);

module.exports = router;
