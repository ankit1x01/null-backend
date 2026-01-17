/**
 * User API Tokens Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

const getMyTokens = async (req, res) => {
  try {
    const tokens = await service.getUserTokens(req.user.id);
    return successResponse(res, 'API tokens retrieved', tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return errorResponse(res, error.message, 500);
  }
};

const createToken = async (req, res) => {
  try {
    const { name, expires_at } = req.body;
    if (!name) {
      return errorResponse(res, 'Token name is required', 400);
    }

    const token = await service.createToken(req.user.id, { name, expires_at });
    return successResponse(res, 'API token created. Save this token - it will not be shown again.', token, 201);
  } catch (error) {
    console.error('Error creating token:', error);
    return errorResponse(res, error.message, 400);
  }
};

const revokeToken = async (req, res) => {
  try {
    const { id } = req.params;
    const revoked = await service.revokeToken(req.user.id, id);
    if (!revoked) {
      return errorResponse(res, 'Token not found', 404);
    }
    return successResponse(res, 'Token revoked');
  } catch (error) {
    console.error('Error revoking token:', error);
    return errorResponse(res, error.message, 400);
  }
};

const regenerateToken = async (req, res) => {
  try {
    const { id } = req.params;
    const token = await service.regenerateToken(req.user.id, id);
    if (!token) {
      return errorResponse(res, 'Token not found', 404);
    }
    return successResponse(res, 'Token regenerated. Save this token - it will not be shown again.', token);
  } catch (error) {
    console.error('Error regenerating token:', error);
    return errorResponse(res, error.message, 400);
  }
};

const updateToken = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const token = await service.updateTokenName(req.user.id, id, name);
    if (!token) {
      return errorResponse(res, 'Token not found', 404);
    }
    return successResponse(res, 'Token updated', token);
  } catch (error) {
    console.error('Error updating token:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getMyTokens,
  createToken,
  revokeToken,
  regenerateToken,
  updateToken
};
