/**
 * EventTypes Controller
 * Handles HTTP requests for event-types operations
 */
const eventTypesServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * CreateEventType
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createEventType = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.createEventType(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventTypesServices.createEventType({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.createEventType.messages.CREAS0001,
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
 * GetEventTypes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getEventTypes = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getEventTypes(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventTypesServices.getEventTypes({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getEventTypes.messages.GETES0001,
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
 * GetEventTypeById
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getEventTypeById = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getEventTypeById(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventTypesServices.getEventTypeById({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getEventTypeById.messages.GETES0001,
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
 * UpdateEventType
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateEventType = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.updateEventType(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventTypesServices.updateEventType({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.updateEventType.messages.UPDAS0001,
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
 * DeleteEventType
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteEventType = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.deleteEventType(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventTypesServices.deleteEventType({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.deleteEventType.messages.DELES0001,
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
  createEventType,
  getEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType
};
