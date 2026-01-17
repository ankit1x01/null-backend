/**
 * OAuth Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// OAuth initiation routes (public)
router.get('/github', controller.getGitHubAuthUrl);
router.get('/google', controller.getGoogleAuthUrl);

// OAuth callback routes (public)
router.post('/github/callback', controller.handleGitHubCallback);
router.post('/google/callback', controller.handleGoogleCallback);

// Authenticated routes
router.get('/providers', jwt.verifyToken, controller.getLinkedProviders);
router.delete('/unlink/:provider', jwt.verifyToken, controller.unlinkProvider);

module.exports = router;
