/**
 * Pages Controller
 * Handles HTTP requests for pages operations
 */
const pagesServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * CreatePage
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createPage = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.createPage(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await pagesServices.createPage({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.createPage.messages.CREAS0001,
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
 * GetPages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getPages = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getPages(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await pagesServices.getPages({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getPages.messages.GETPS0001,
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
 * GetPageById
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getPageById = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.getPageById(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await pagesServices.getPageById({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.getPageById.messages.GETPS0001,
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
 * UpdatePage
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updatePage = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.updatePage(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await pagesServices.updatePage({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.updatePage.messages.UPDAS0001,
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
 * DeletePage
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deletePage = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.deletePage(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await pagesServices.deletePage({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.deletePage.messages.DELES0001,
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
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage
};
