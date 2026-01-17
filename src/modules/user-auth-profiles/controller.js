/**
 * User Auth Profiles Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

const getMyProfiles = async (req, res) => {
  try {
    const profiles = await service.getUserProfiles(req.user.id);
    return successResponse(res, 'Auth profiles retrieved', profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return errorResponse(res, error.message, 500);
  }
};

const linkProvider = async (req, res) => {
  try {
    const profile = await service.linkProvider(req.user.id, req.body);
    return successResponse(res, 'Provider linked', profile, 201);
  } catch (error) {
    console.error('Error linking provider:', error);
    return errorResponse(res, error.message, 400);
  }
};

const unlinkProvider = async (req, res) => {
  try {
    const { provider } = req.params;
    await service.unlinkProvider(req.user.id, provider);
    return successResponse(res, 'Provider unlinked');
  } catch (error) {
    console.error('Error unlinking provider:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getMyProfiles,
  linkProvider,
  unlinkProvider
};
