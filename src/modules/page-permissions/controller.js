/**
 * PagePermissions Controller
 * Handles HTTP requests for page-permissions operations
 */
const pagePermissionsServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * CreatePagePermission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createPagePermission = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.createPagePermission(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await pagePermissionsServices.createPagePermission({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.createPagePermission.messages.CREAS0001,
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
 * UpdatePagePermission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updatePagePermission = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.updatePagePermission(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await pagePermissionsServices.updatePagePermission({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.updatePagePermission.messages.UPDAS0001,
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
 * DeletePagePermission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deletePagePermission = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.deletePagePermission(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await pagePermissionsServices.deletePagePermission({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.deletePagePermission.messages.DELES0001,
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
  createPagePermission,
  updatePagePermission,
  deletePagePermission
};
