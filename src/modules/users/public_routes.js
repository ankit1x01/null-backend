const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Public routes
router.get('/public/:id', controller.getPublicProfile);

module.exports = router;
