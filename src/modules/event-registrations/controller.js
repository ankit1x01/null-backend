/**
 * EventRegistrations Controller
 * Handles HTTP requests for event-registrations operations
 */
const eventRegistrationsServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * CreateEventRegistration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createEventRegistration = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.createEventRegistration(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventRegistrationsServices.createEventRegistration({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.createEventRegistration.messages.CREAS0001,
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
 * GetEventRegistrations
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getEventRegistrations = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getEventRegistrations(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventRegistrationsServices.getEventRegistrations({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getEventRegistrations.messages.GETES0001,
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
 * GetEventRegistrationById
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getEventRegistrationById = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getEventRegistrationById(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventRegistrationsServices.getEventRegistrationById({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getEventRegistrationById.messages.GETES0001,
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
 * UpdateEventRegistration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateEventRegistration = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.updateEventRegistration(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventRegistrationsServices.updateEventRegistration({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.updateEventRegistration.messages.UPDAS0001,
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
 * DeleteEventRegistration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteEventRegistration = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.deleteEventRegistration(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventRegistrationsServices.deleteEventRegistration({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.deleteEventRegistration.messages.DELES0001,
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
  createEventRegistration,
  getEventRegistrations,
  getEventRegistrationById,
  updateEventRegistration,
  deleteEventRegistration
};
