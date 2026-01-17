/**
 * Calendar Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// Public ICS feeds (no auth required for calendar subscriptions)
router.get('/global.ics', controller.getGlobalCalendar);
router.get('/chapter/:chapterId.ics', controller.getChapterCalendar);

// JSON info endpoint
router.get('/chapter/:chapterId/info', controller.getChapterCalendarJson);

// Personal calendar (requires auth)
router.get('/my.ics', jwt.verifyToken, controller.getMyCalendar);

module.exports = router;
