/**
 * Chapters Controller
 * Handles HTTP requests for chapters operations
 */
const chaptersServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * GetChapters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getChapters = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getChapters(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await chaptersServices.getChapters({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getChapters.messages.GETCE0001,
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
 * GetChapterById
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getChapterById = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getChapterById(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await chaptersServices.getChapterById({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getChapterById.messages.GETCE0001,
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
  getChapters,
  getChapterById,
  createChapter: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await chaptersServices.createChapter({
        ...req.body,
        requestId: req.requestId
      });
      next({
        code: 'CHPT0001',
        statusCode: 201,
        message: 'Chapter created successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  },
  updateChapter: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await chaptersServices.updateChapter({
        id: req.params.id,
        ...req.body,
        requestId: req.requestId
      });
      next({
        code: 'CHPT0002',
        statusCode: 200,
        message: 'Chapter updated successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  },
  deleteChapter: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await chaptersServices.deleteChapter({
        id: req.params.id,
        requestId: req.requestId
      });
      next({
        code: 'CHPT0004',
        statusCode: 200,
        message: 'Chapter deleted successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  }
};
