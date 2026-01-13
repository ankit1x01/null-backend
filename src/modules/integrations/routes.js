const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/slackbot/events', controller.handleSlackEvents);

module.exports = router;
