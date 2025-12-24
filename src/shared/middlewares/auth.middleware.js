/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes that require authentication
 */
const jwt = require('jsonwebtoken');

/**
 * Verify JWT token middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        code: 'AUTH0001',
        message: 'Access denied. No token provided.',
      });
    }

    // Extract token from Bearer format
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'error',
        code: 'AUTH0002',
        message: 'Invalid token format.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user data to request object
    req.user = decoded;

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: 'error',
        code: 'AUTH0003',
        message: 'Invalid token.',
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: 'error',
        code: 'AUTH0004',
        message: 'Your session has expired. Please login again.',
      });
    } else {
      return res.status(500).json({
        status: 'error',
        code: 'AUTH0005',
        message: 'Internal server error during authentication.',
      });
    }
  }
};

/**
 * Check if user is an admin
 * @returns {Function} - Express middleware function
 */
const isAdmin = (req, res, next) => {
  // Verify token first
  verifyToken(req, res, () => {
    // Check if user is an admin
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({
        status: 'error',
        code: 'AUTH0006',
        message: 'Access denied. Admin privileges required.',
      });
    }
  });
};

module.exports = {
  verifyToken,
  isAdmin
};
