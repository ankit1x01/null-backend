/**
 * Auth Module Routes
 * Defines all routes for authentication operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// Public authentication routes
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/:provider/token', controller.providerToken);

// Password reset routes
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);

// Email confirmation routes
router.post('/confirm-email', controller.confirmEmail);
router.post('/resend-confirmation', controller.resendConfirmation);

// Account unlock route
router.post('/unlock-account', controller.unlockAccount);

// Authenticated routes
router.get('/check', jwt.verifyToken, controller.checkAuthentication);

module.exports = router;
