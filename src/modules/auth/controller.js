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

/**
 * Check if user is authenticated
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const checkAuthentication = async (req, res, next) => {
  try {
    // If we get here, JWT middleware has already validated the token
    if (req.user) {
      next({
        code: 'AUTH0002',
        statusCode: 200,
        message: 'Success',
        result: { authenticated: true, userId: req.user.id }
      });
    } else {
      next(new Error(JSON.stringify({
        code: 'AUTH0003',
        statusCode: 401,
        message: 'Invalid user',
        result: null
      })));
    }
  } catch (error) {
    next(new Error(JSON.stringify({
      code: 'AUTH0003',
      statusCode: 401,
      message: 'Invalid user',
      result: null
    })));
  }
};

/**
 * Forgot password - request password reset
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return next(new Error(JSON.stringify({
        code: 'AUTH0004',
        statusCode: 400,
        message: 'Email is required',
        result: null
      })));
    }

    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;

    const result = await authServices.forgotPassword({
      email,
      requestId: req.requestId
    });

    next({
      code: 'AUTH0005',
      statusCode: 200,
      message: 'Password reset instructions sent',
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
 * Reset password with token
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return next(new Error(JSON.stringify({
        code: 'AUTH0006',
        statusCode: 400,
        message: 'Token and password are required',
        result: null
      })));
    }

    if (password.length < 6) {
      return next(new Error(JSON.stringify({
        code: 'AUTH0007',
        statusCode: 400,
        message: 'Password must be at least 6 characters',
        result: null
      })));
    }

    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;

    const result = await authServices.resetPassword({
      token,
      password,
      requestId: req.requestId
    });

    next({
      code: 'AUTH0008',
      statusCode: 200,
      message: 'Password reset successful',
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
 * Confirm email with token
 */
const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return next(new Error(JSON.stringify({
        code: 'AUTH0009',
        statusCode: 400,
        message: 'Confirmation token is required',
        result: null
      })));
    }

    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;

    const result = await authServices.confirmEmail({
      token,
      requestId: req.requestId
    });

    next({
      code: 'AUTH0014',
      statusCode: 200,
      message: 'Email confirmed',
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
 * Resend confirmation email
 */
const resendConfirmation = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return next(new Error(JSON.stringify({
        code: 'AUTH0015',
        statusCode: 400,
        message: 'Email is required',
        result: null
      })));
    }

    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;

    const result = await authServices.resendConfirmation({
      email,
      requestId: req.requestId
    });

    next({
      code: 'AUTH0016',
      statusCode: 200,
      message: 'Confirmation email sent',
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
 * Unlock account with token
 */
const unlockAccount = async (req, res, next) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return next(new Error(JSON.stringify({
        code: 'AUTH0017',
        statusCode: 400,
        message: 'Unlock token is required',
        result: null
      })));
    }

    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;

    const result = await authServices.unlockAccount({
      token,
      requestId: req.requestId
    });

    next({
      code: 'AUTH0018',
      statusCode: 200,
      message: 'Account unlocked',
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
  login,
  register,
  checkAuthentication,
  forgotPassword,
  resetPassword,
  confirmEmail,
  resendConfirmation,
  unlockAccount,
  providerToken: async (req, res, next) => {
    // Stub implementation for social auth
    next(new Error(JSON.stringify({
      code: 'AUTH0001',
      statusCode: 501,
      message: 'Not Implemented',
      result: null
    })));
  }
};
