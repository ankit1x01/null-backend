/**
 * ChapterLeads Module Routes
 * Defines all routes for chapter-leads operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// ChapterLeads routes
router.post('/createChapterLead', controller.createChapterLead);
router.get('/getChapterLeads', controller.getChapterLeads);
router.get('/getChapterLeadById', controller.getChapterLeadById);
router.put('/updateChapterLead/:id', controller.updateChapterLead);
router.delete('/deleteChapterLead/:id', controller.deleteChapterLead);

module.exports = router;
