/**
 * EventSessionComments Controller
 * Handles HTTP requests for event-session-comments operations
 */
const eventSessionCommentsServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * CreateEventSessionComment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createEventSessionComment = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.createEventSessionComment(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventSessionCommentsServices.createEventSessionComment({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.createEventSessionComment.messages.CREAS0001,
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      // Pass the error to the response middleware
      next(error);
    } else {
      // For unexpected errors, create a standardized error format
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

/**
 * UpdateEventSessionComment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateEventSessionComment = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.updateEventSessionComment(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventSessionCommentsServices.updateEventSessionComment({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.updateEventSessionComment.messages.UPDAS0001,
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      // Pass the error to the response middleware
      next(error);
    } else {
      // For unexpected errors, create a standardized error format
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

/**
 * DeleteEventSessionComment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteEventSessionComment = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.deleteEventSessionComment(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventSessionCommentsServices.deleteEventSessionComment({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.deleteEventSessionComment.messages.DELES0001,
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      // Pass the error to the response middleware
      next(error);
    } else {
      // For unexpected errors, create a standardized error format
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};

module.exports = {
  createEventSessionComment,
  updateEventSessionComment,
  deleteEventSessionComment,
  getEventSessionComments: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await eventSessionCommentsServices.getEventSessionComments({
        ...req.query,
        requestId: req.requestId
      });
      next({
        code: 'ESCM0001',
        statusCode: 200,
        message: 'Event session comments fetched successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  },
  getEventSessionCommentById: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await eventSessionCommentsServices.getEventSessionCommentById({
        id: req.params.id,
        requestId: req.requestId
      });
      next({
        code: 'ESCM0002',
        statusCode: 200,
        message: 'Event session comment fetched successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  }
};
