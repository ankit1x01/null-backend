/**
 * Chapters Module Routes
 * Defines all routes for chapters operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Chapters routes
router.get('/getChapters', controller.getChapters);
router.get('/getChapterById', controller.getChapterById);
router.post('/createChapter', controller.createChapter);
router.put('/updateChapter/:id', controller.updateChapter);
router.delete('/deleteChapter/:id', controller.deleteChapter);

module.exports = router;
