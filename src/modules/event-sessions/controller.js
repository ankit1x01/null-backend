/**
 * EventSessions Controller
 * Handles HTTP requests for event-sessions operations
 */
const eventSessionsServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * CreateEventSession
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createEventSession = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.createEventSession(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventSessionsServices.createEventSession({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.createEventSession.messages.CREAS0001,
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
 * GetEventSessions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getEventSessions = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getEventSessions(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventSessionsServices.getEventSessions({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getEventSessions.messages.GETES0001,
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
 * GetEventSessionById
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getEventSessionById = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getEventSessionById(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventSessionsServices.getEventSessionById({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getEventSessionById.messages.GETES0001,
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
 * UpdateEventSession
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateEventSession = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.updateEventSession(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventSessionsServices.updateEventSession({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.updateEventSession.messages.UPDAS0001,
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
 * DeleteEventSession
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteEventSession = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.deleteEventSession(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventSessionsServices.deleteEventSession({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.deleteEventSession.messages.DELES0001,
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
  createEventSession,
  getEventSessions,
  getEventSessionById,
  updateEventSession,
  deleteEventSession
};
