const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/:userId', controller.getUserAchievements);

module.exports = router;
