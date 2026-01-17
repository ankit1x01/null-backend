/**
 * Mass Email Controller
 */

const service = require('./services');

/**
 * Get all campaigns
 */
const getCampaigns = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, event_id, chapter_id } = req.query;
    const result = await service.getCampaigns(
      { status, event_id, chapter_id },
      parseInt(page),
      parseInt(limit)
    );
    res.locals.code = 'MASS_EMAIL_001';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_001';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Get campaign by ID
 */
const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.getCampaignById(id);
    res.locals.code = 'MASS_EMAIL_002';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_002';
    res.locals.message = error.message;
    res.status(error.message === 'Campaign not found' ? 404 : 500);
  }
};

/**
 * Create campaign
 */
const createCampaign = async (req, res) => {
  try {
    const userId = req.user?.id;
    const result = await service.createCampaign(req.body, userId);
    res.locals.code = 'MASS_EMAIL_003';
    res.locals.data = result;
    res.status(201);
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_003';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Update campaign
 */
const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.updateCampaign(id, req.body);
    res.locals.code = 'MASS_EMAIL_004';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_004';
    res.locals.message = error.message;
    res.status(error.message === 'Campaign not found' ? 404 : 500);
  }
};

/**
 * Delete campaign
 */
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.deleteCampaign(id);
    res.locals.code = 'MASS_EMAIL_005';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_005';
    res.locals.message = error.message;
    res.status(error.message === 'Campaign not found' ? 404 : 500);
  }
};

/**
 * Get event recipients
 */
const getEventRecipients = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status, attended } = req.query;
    const result = await service.getEventRecipients(eventId, { status, attended });
    res.locals.code = 'MASS_EMAIL_006';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_006';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Get chapter recipients
 */
const getChapterRecipients = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const result = await service.getChapterRecipients(chapterId);
    res.locals.code = 'MASS_EMAIL_007';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_007';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Add recipients to campaign
 */
const addRecipients = async (req, res) => {
  try {
    const { id } = req.params;
    const { recipients } = req.body;
    const result = await service.addRecipients(id, recipients);
    res.locals.code = 'MASS_EMAIL_008';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_008';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Remove recipient from campaign
 */
const removeRecipient = async (req, res) => {
  try {
    const { id, recipientId } = req.params;
    const result = await service.removeRecipient(id, recipientId);
    res.locals.code = 'MASS_EMAIL_009';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_009';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Send campaign
 */
const sendCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.sendCampaign(id);
    res.locals.code = 'MASS_EMAIL_010';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_010';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Schedule campaign
 */
const scheduleCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduled_at } = req.body;
    const result = await service.scheduleCampaign(id, scheduled_at);
    res.locals.code = 'MASS_EMAIL_011';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_011';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Cancel scheduled campaign
 */
const cancelScheduledCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.cancelScheduledCampaign(id);
    res.locals.code = 'MASS_EMAIL_012';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_012';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Get campaign stats
 */
const getCampaignStats = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.getCampaignStats(id);
    res.locals.code = 'MASS_EMAIL_013';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_013';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Get email templates
 */
const getTemplates = async (req, res) => {
  try {
    const result = await service.getTemplates();
    res.locals.code = 'MASS_EMAIL_014';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_MASS_EMAIL_014';
    res.locals.message = error.message;
    res.status(500);
  }
};

module.exports = {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getEventRecipients,
  getChapterRecipients,
  addRecipients,
  removeRecipient,
  sendCampaign,
  scheduleCampaign,
  cancelScheduledCampaign,
  getCampaignStats,
  getTemplates
};
