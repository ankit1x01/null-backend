/**
 * JWT Authentication Middleware
 * Verifies JWT tokens and attaches user to request
 */

const jwt = require('jsonwebtoken');
const { User, UserApiToken } = require('../models');

/**
 * Verify JWT token and attach user to request
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next function
 */
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization || req.headers['x-access-token'];

    if (!authHeader) {
      return res.status(401).json({
        code: 'AUTH0001',
        statusCode: 401,
        message: 'No authentication token provided'
      });
    }

    // Extract token
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        code: 'AUTH0002',
        statusCode: 401,
        message: 'User not found'
      });
    }

    // Check if user is confirmed
    if (!user.confirmed_at) {
      return res.status(403).json({
        code: 'AUTH0003',
        statusCode: 403,
        message: 'Email not confirmed'
      });
    }

    // Update last used time for API token
    await UserApiToken.update(
      { last_used_at: new Date() },
      { where: { token, user_id: user.id } }
    );

    // Attach user to request
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 'AUTH0004',
        statusCode: 401,
        message: 'Invalid token'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: 'AUTH0005',
        statusCode: 401,
        message: 'Token expired'
      });
    }
    return res.status(500).json({
      code: 'AUTH0006',
      statusCode: 500,
      message: 'Authentication error'
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next function
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers['x-access-token'];

    if (!authHeader) {
      req.user = null;
      return next();
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    req.user = user || null;
    req.token = token;

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

/**
 * Check if user is a chapter leader
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next function
 */
const isLeader = async (req, res, next) => {
  try {
    const { ChapterLead } = require('../models');

    const leads = await ChapterLead.findAll({
      where: { user_id: req.user.id, active: true }
    });

    if (leads.length === 0) {
      return res.status(403).json({
        code: 'AUTH0007',
        statusCode: 403,
        message: 'Access denied. Chapter leader privileges required.'
      });
    }

    req.managedChapters = leads.map(l => l.chapter_id);
    next();
  } catch (error) {
    return res.status(500).json({
      code: 'AUTH0008',
      statusCode: 500,
      message: 'Authorization error'
    });
  }
};

module.exports = {
  verifyToken,
  optionalAuth,
  isLeader
};
