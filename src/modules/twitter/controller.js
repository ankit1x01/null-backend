/**
 * Twitter Integration Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

const getIntegrations = async (req, res) => {
  try {
    const integrations = await service.getAllIntegrations();
    return successResponse(res, 'Twitter integrations retrieved', integrations);
  } catch (error) {
    console.error('Error fetching integrations:', error);
    return errorResponse(res, error.message, 500);
  }
};

const getIntegrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const integration = await service.getIntegrationById(id);
    if (!integration) {
      return errorResponse(res, 'Integration not found', 404);
    }
    return successResponse(res, 'Integration retrieved', integration);
  } catch (error) {
    console.error('Error fetching integration:', error);
    return errorResponse(res, error.message, 500);
  }
};

const createIntegration = async (req, res) => {
  try {
    const integration = await service.createIntegration(req.body);
    return successResponse(res, 'Integration created', integration, 201);
  } catch (error) {
    console.error('Error creating integration:', error);
    return errorResponse(res, error.message, 400);
  }
};

const updateIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const integration = await service.updateIntegration(id, req.body);
    if (!integration) {
      return errorResponse(res, 'Integration not found', 404);
    }
    return successResponse(res, 'Integration updated', integration);
  } catch (error) {
    console.error('Error updating integration:', error);
    return errorResponse(res, error.message, 400);
  }
};

const deleteIntegration = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteIntegration(id);
    if (!deleted) {
      return errorResponse(res, 'Integration not found', 404);
    }
    return successResponse(res, 'Integration deleted');
  } catch (error) {
    console.error('Error deleting integration:', error);
    return errorResponse(res, error.message, 400);
  }
};

const tweetEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const result = await service.tweetEvent(eventId);
    return successResponse(res, 'Tweet sent', result);
  } catch (error) {
    console.error('Error tweeting event:', error);
    return errorResponse(res, error.message, 400);
  }
};

const getTweetHistory = async (req, res) => {
  try {
    const { event_id, status, limit } = req.query;
    const history = await service.getTweetHistory({
      event_id,
      status,
      limit: limit ? parseInt(limit) : undefined
    });
    return successResponse(res, 'Tweet history retrieved', history);
  } catch (error) {
    console.error('Error fetching tweet history:', error);
    return errorResponse(res, error.message, 500);
  }
};

const retryTweet = async (req, res) => {
  try {
    const { tweetLogId } = req.params;
    const result = await service.retryTweet(tweetLogId);
    return successResponse(res, 'Tweet retried', result);
  } catch (error) {
    console.error('Error retrying tweet:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getIntegrations,
  getIntegrationById,
  createIntegration,
  updateIntegration,
  deleteIntegration,
  tweetEvent,
  getTweetHistory,
  retryTweet
};
