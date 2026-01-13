/**
 * Auth Module Routes
 * Defines all routes for authentication operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Public authentication routes
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/:provider/token', controller.providerToken);

module.exports = router;
