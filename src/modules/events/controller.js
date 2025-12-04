/**
 * Events Controller
 * Handles HTTP requests for events operations
 */
const eventsServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * GetEvents
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getEvents = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getEvents(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventsServices.getEvents({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getEvents.messages.GETES0001,
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
 * GetEventById
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getEventById = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getEventById(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await eventsServices.getEventById({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getEventById.messages.GETES0001,
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
  getEvents,
  getEventById,
  createEvent: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await eventsServices.createEvent({
        ...req.body,
        requestId: req.requestId
      });
      next({
        code: 'EVNT0001',
        statusCode: 201,
        message: 'Event created successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  },
  updateEvent: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await eventsServices.updateEvent({
        id: req.params.id,
        ...req.body,
        requestId: req.requestId
      });
      next({
        code: 'EVNT0002',
        statusCode: 200,
        message: 'Event updated successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  },
  deleteEvent: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await eventsServices.deleteEvent({
        id: req.params.id,
        requestId: req.requestId
      });
      next({
        code: 'EVNT0004',
        statusCode: 200,
        message: 'Event deleted successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  }
};
