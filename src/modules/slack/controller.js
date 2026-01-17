/**
 * Slack Integration Controller
 */

const service = require('./services');

/**
 * Slackbot events search (POST /api/slackbot/events)
 * Searches for events by chapter name
 */
const slackbotEvents = async (req, res) => {
  try {
    const { text, token } = req.body;
    const result = await service.searchEventsByChapter(text, token);
    
    // Return Slack-formatted response directly
    return res.json(result);
  } catch (error) {
    return res.json({
      text: 'An error occurred while searching for events',
      attachments: []
    });
  }
};

/**
 * Get all integrations
 */
const getIntegrations = async (req, res) => {
  try {
    const { chapter_id, is_active } = req.query;
    const result = await service.getIntegrations({ chapter_id, is_active });
    res.locals.code = 'SLACK_001';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_001';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Get integration by ID
 */
const getIntegrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.getIntegrationById(id);
    res.locals.code = 'SLACK_002';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_002';
    res.locals.message = error.message;
    res.status(error.message === 'Integration not found' ? 404 : 500);
  }
};

/**
 * Get integration by chapter
 */
const getIntegrationByChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const result = await service.getIntegrationByChapter(chapterId);
    res.locals.code = 'SLACK_003';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_003';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Create integration
 */
const createIntegration = async (req, res) => {
  try {
    const result = await service.createIntegration(req.body);
    res.locals.code = 'SLACK_004';
    res.locals.data = result;
    res.status(201);
  } catch (error) {
    res.locals.code = 'ERR_SLACK_004';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Update integration
 */
const updateIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.updateIntegration(id, req.body);
    res.locals.code = 'SLACK_005';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_005';
    res.locals.message = error.message;
    res.status(error.message === 'Integration not found' ? 404 : 500);
  }
};

/**
 * Delete integration
 */
const deleteIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.deleteIntegration(id);
    res.locals.code = 'SLACK_006';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_006';
    res.locals.message = error.message;
    res.status(error.message === 'Integration not found' ? 404 : 500);
  }
};

/**
 * Toggle integration active status
 */
const toggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.toggleActive(id);
    res.locals.code = 'SLACK_007';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_007';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Test webhook
 */
const testWebhook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.testWebhook(id);
    res.locals.code = 'SLACK_008';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_008';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Notify new event
 */
const notifyNewEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const result = await service.notifyNewEvent(eventId);
    res.locals.code = 'SLACK_009';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_009';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Notify event update
 */
const notifyEventUpdate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { updateType } = req.body;
    const result = await service.notifyEventUpdate(eventId, updateType);
    res.locals.code = 'SLACK_010';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_010';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Notify new session
 */
const notifyNewSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await service.notifyNewSession(sessionId);
    res.locals.code = 'SLACK_011';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_011';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Send custom notification
 */
const sendCustomNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.sendCustomNotification(id, req.body);
    res.locals.code = 'SLACK_012';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_012';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Get notification logs
 */
const getNotificationLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const result = await service.getNotificationLogs(id, parseInt(page), parseInt(limit));
    res.locals.code = 'SLACK_013';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_013';
    res.locals.message = error.message;
    res.status(500);
  }
};

/**
 * Retry failed notification
 */
const retryNotification = async (req, res) => {
  try {
    const { logId } = req.params;
    const result = await service.retryNotification(logId);
    res.locals.code = 'SLACK_014';
    res.locals.data = result;
  } catch (error) {
    res.locals.code = 'ERR_SLACK_014';
    res.locals.message = error.message;
    res.status(500);
  }
};

module.exports = {
  slackbotEvents,
  getIntegrations,
  getIntegrationById,
  getIntegrationByChapter,
  createIntegration,
  updateIntegration,
  deleteIntegration,
  toggleActive,
  testWebhook,
  notifyNewEvent,
  notifyEventUpdate,
  notifyNewSession,
  sendCustomNotification,
  getNotificationLogs,
  retryNotification
};
