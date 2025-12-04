/**
 * Users Controller
 * Handles HTTP requests for users operations
 */
const usersServices = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

/**
 * GetMe - Get current authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getMe = async (req, res, next) => {
  try {
    // User is already attached by JWT middleware
    if (!req.user) {
      throw new Error(JSON.stringify({
        code: 'USER0002',
        statusCode: 401,
        message: 'Authentication required'
      }));
    }

    // Handle logic within service function
    const result = await usersServices.getMe({
      userId: req.user.id
    });

    // Return standardized response using the response middleware
    next({
      code: 'USERS0001',
      statusCode: 200,
      message: 'User retrieved successfully',
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
 * GetUserEvents - Get events registered by user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getUserEvents = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error(JSON.stringify({
        code: 'USER0002',
        statusCode: 401,
        message: 'Authentication required'
      }));
    }

    // Handle logic within service function
    const result = await usersServices.getUserEvents({
      userId: req.user.id
    });

    // Return standardized response using the response middleware
    next({
      code: 'USERS0002',
      statusCode: 200,
      message: 'User events retrieved successfully',
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
 * GetUserSessions - Get sessions delivered by user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getUserSessions = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error(JSON.stringify({
        code: 'USER0002',
        statusCode: 401,
        message: 'Authentication required'
      }));
    }

    // Handle logic within service function
    const result = await usersServices.getUserSessions({
      userId: req.user.id
    });

    // Return standardized response using the response middleware
    next({
      code: 'USERS0003',
      statusCode: 200,
      message: 'User sessions retrieved successfully',
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
  getMe,
  getUserEvents,
  getUserSessions,
  getUsers: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await usersServices.getUsers({
        requestId: req.requestId
      });
      next({
        code: 'USERS0004',
        statusCode: 200,
        message: 'Users retrieved successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await usersServices.getUserById({
        requestId: req.requestId,
        userId: req.query.userId
      });
      next({
        code: 'USERS0005',
        statusCode: 200,
        message: 'User retrieved successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await usersServices.updateUser({
        requestId: req.requestId,
        userId: req.params.id,
        ...req.body
      });
      next({
        code: 'USERS0006',
        statusCode: 200,
        message: 'User updated successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await usersServices.deleteUser({
        requestId: req.requestId,
        userId: req.params.id
      });
      next({
        code: 'USERS0007',
        statusCode: 200,
        message: 'User deleted successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  }
};
