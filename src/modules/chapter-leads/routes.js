/**
 * ChapterLeads Module Routes
 * Defines all routes for chapter-leads operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const { jwt } = require('../../shared/middlewares');

// ChapterLeads routes
router.post('/createChapterLead', jwt.verifyToken, jwt.isAdmin, controller.createChapterLead);
router.get('/getChapterLeads', controller.getChapterLeads);
router.get('/getChapterLeadById', controller.getChapterLeadById);
router.put('/updateChapterLead/:id', jwt.verifyToken, jwt.isAdmin, controller.updateChapterLead);
router.delete('/deleteChapterLead/:id', jwt.verifyToken, jwt.isAdmin, controller.deleteChapterLead);

module.exports = router;
