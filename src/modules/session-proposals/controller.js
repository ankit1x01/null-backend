/**
 * Session Proposals Controller
 * Handles HTTP requests for session proposals operations
 */
const sessionProposalsServices = require('./services');
const sharedConstants = require('../../shared/constants');

/**
 * Get all session proposals
 */
const getSessionProposals = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionProposalsServices.getSessionProposals({
      ...req.query,
      requestId: req.requestId
    });
    next({
      code: 'SPROP0001',
      statusCode: 200,
      message: 'Session proposals retrieved successfully',
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
 * Get session proposal by ID
 */
const getSessionProposalById = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionProposalsServices.getSessionProposalById({
      id: req.params.id,
      requestId: req.requestId
    });
    next({
      code: 'SPROP0002',
      statusCode: 200,
      message: 'Session proposal retrieved successfully',
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
 * Create session proposal
 */
const createSessionProposal = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionProposalsServices.createSessionProposal({
      ...req.body,
      user_id: req.user.id, // From JWT token
      requestId: req.requestId
    });
    next({
      code: 'SPROP0003',
      statusCode: 201,
      message: 'Session proposal created successfully',
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
 * Update session proposal
 */
const updateSessionProposal = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionProposalsServices.updateSessionProposal({
      id: req.params.id,
      user_id: req.user.id,
      ...req.body,
      requestId: req.requestId
    });
    next({
      code: 'SPROP0004',
      statusCode: 200,
      message: 'Session proposal updated successfully',
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
 * Delete session proposal
 */
const deleteSessionProposal = async (req, res, next) => {
  try {
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    const result = await sessionProposalsServices.deleteSessionProposal({
      id: req.params.id,
      requestId: req.requestId
    });
    next({
      code: 'SPROP0005',
      statusCode: 200,
      message: 'Session proposal deleted successfully',
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
  getSessionProposals,
  getSessionProposalById,
  createSessionProposal,
  updateSessionProposal,
  deleteSessionProposal,
};
