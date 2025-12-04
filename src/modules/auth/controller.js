/**
 * Auth Controller
 * Handles HTTP requests for authentication operations
 */
const authServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * Login user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const login = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.login(req);

    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;

    // Handle logic within service function
    const result = await authServices.login({
      email: validatedRequest.email,
      password: validatedRequest.password,
      requestId: req.requestId,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    // Return standardized response using the response middleware
    next({
      ...constants.login.messages.USRS0001,
      result
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    if (error instanceof Error && error.message.startsWith('{')) {
      // Pass the error to the response middleware
      next(error);
    } else {
      // For unexpected errors, create a standardized error format
      console.error('[Login Error - Unexpected]:', error.message, error.stack);
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
}

/**
 * Register new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const register = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.register(req);
    
    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    // Handle logic within service function
    const result = await authServices.register({
      email: validatedRequest.email,
      password: validatedRequest.password,
      name: validatedRequest.name,
      requestId: req.requestId
    });
    
    // Return standardized response using the response middleware
    next({
      ...constants.register.messages.USRS0002,
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
}

module.exports = {
  login,
  register
};
