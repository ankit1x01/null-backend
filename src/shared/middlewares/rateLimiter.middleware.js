/**
 * Rate Limiter Middleware
 * Implements request rate limiting to protect against abuse and DoS attacks
 * Uses express-rate-limit package to limit repeated requests to public APIs
 */
const rateLimit = require('express-rate-limit');
const sharedConstants = require('../constants');

/**
 * Custom key generator for rate limiting
 * Handles both IPv4 and IPv6 addresses safely
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {string} - Unique key for rate limiting
 */
const ipKeyGenerator = (req, res) => {
  // Get the real IP address, considering proxies
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.connection.remoteAddress || req.ip;
  
  // Handle IPv6 mapped IPv4 addresses
  const cleanIp = ip.replace(/^::ffff:/, '');
  
  return cleanIp;
};

// Define rate limiting rules
const customRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: (req, res) => {
    // Skip rate limiting for Swagger documentation
    if (req.originalUrl && req.originalUrl.startsWith('/api-docs')) {
      return 1000; // Very high limit for documentation
    }
    
    const ip = req.ip;
    if (
      sharedConstants.appConfig &&
      sharedConstants.appConfig.app &&
      sharedConstants.appConfig.app.rateLimitAllowedIp &&
      sharedConstants.appConfig.app.rateLimitAllowedIp.includes(ip)
    ) {
      return 100; // Allow 100 requests/min for allowed IPs
    }
    return 10; // Others get 10 requests/min
  },
  message: "Too many requests from this host, please try again later.",
  headers: true,
  keyGenerator: (req, res) => ipKeyGenerator(req, res), // ✅ Safe for IPv6
  handler: (req, res, next, options) => {
    res.status(429).json({
      error: "Too many requests",
      message: options.message,
    });
  },
});

module.exports = customRateLimiter;
