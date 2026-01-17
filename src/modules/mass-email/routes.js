/**
 * Mass Email Routes
 */

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyToken: authenticate, isAdmin: authorize } = require('../../shared/middlewares/auth.middleware');

// All routes require authentication
router.use(authenticate);

// Get email templates
router.get('/templates', controller.getTemplates);

// Get all campaigns
router.get('/campaigns', controller.getCampaigns);

// Get campaign by ID
router.get('/campaigns/:id', controller.getCampaignById);

// Get campaign stats
router.get('/campaigns/:id/stats', controller.getCampaignStats);

// Create campaign
router.post('/campaigns', controller.createCampaign);

// Update campaign
router.put('/campaigns/:id', controller.updateCampaign);

// Delete campaign
router.delete('/campaigns/:id', controller.deleteCampaign);

// Get event recipients
router.get('/recipients/event/:eventId', controller.getEventRecipients);

// Get chapter recipients
router.get('/recipients/chapter/:chapterId', controller.getChapterRecipients);

// Add recipients to campaign
router.post('/campaigns/:id/recipients', controller.addRecipients);

// Remove recipient from campaign
router.delete('/campaigns/:id/recipients/:recipientId', controller.removeRecipient);

// Send campaign
router.post('/campaigns/:id/send', controller.sendCampaign);

// Schedule campaign
router.post('/campaigns/:id/schedule', controller.scheduleCampaign);

// Cancel scheduled campaign
router.post('/campaigns/:id/cancel-schedule', controller.cancelScheduledCampaign);

module.exports = router;
