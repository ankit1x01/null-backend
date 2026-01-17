/**
 * Session Requests Controller
 * Handles HTTP requests for session requests operations
 */
const sessionRequestsServices = require('./services');
const sharedConstants = require('../../shared/constants');

/**
 * Get all session requests
 */
const getSessionRequests = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionRequestsServices.getSessionRequests({
      ...req.query,
      requestId: req.requestId
    });
    next({
      code: 'SREQ0001',
      statusCode: 200,
      message: 'Session requests retrieved successfully',
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      next(error);
    } else {
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

/**
 * Get session request by ID
 */
const getSessionRequestById = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionRequestsServices.getSessionRequestById({
      id: req.params.id,
      requestId: req.requestId
    });
    next({
      code: 'SREQ0002',
      statusCode: 200,
      message: 'Session request retrieved successfully',
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      next(error);
    } else {
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

/**
 * Create session request
 */
const createSessionRequest = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionRequestsServices.createSessionRequest({
      ...req.body,
      requestId: req.requestId
    });
    next({
      code: 'SREQ0003',
      statusCode: 201,
      message: 'Session request created successfully',
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      next(error);
    } else {
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

/**
 * Update session request
 */
const updateSessionRequest = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionRequestsServices.updateSessionRequest({
      id: req.params.id,
      ...req.body,
      requestId: req.requestId
    });
    next({
      code: 'SREQ0004',
      statusCode: 200,
      message: 'Session request updated successfully',
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      next(error);
    } else {
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

/**
 * Delete session request
 */
const deleteSessionRequest = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionRequestsServices.deleteSessionRequest({
      id: req.params.id,
      requestId: req.requestId
    });
    next({
      code: 'SREQ0005',
      statusCode: 200,
      message: 'Session request deleted successfully',
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      next(error);
    } else {
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

/**
 * Update session request status (Admin only)
 */
const updateStatus = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionRequestsServices.updateStatus({
      id: req.params.id,
      status: req.body.status,
      requestId: req.requestId
    });
    next({
      code: 'SREQ0006',
      statusCode: 200,
      message: 'Session request status updated successfully',
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      next(error);
    } else {
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

module.exports = {
  getSessionRequests,
  getSessionRequestById,
  createSessionRequest,
  updateSessionRequest,
  deleteSessionRequest,
  updateStatus
};
