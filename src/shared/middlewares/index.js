/**
 * Shared Middlewares
 * Export all shared middlewares for use throughout the application
 */
const authMiddleware = require('./auth.middleware');
const responseMiddleware = require('./response.middleware');
const decryptMiddleware = require('./decrypt.middleware');
const encryptMiddleware = require('./encrypt.middleware');
const rateLimiterMiddleware = require('./rateLimiter.middleware');
const jwtMiddleware = require('./jwt.middleware');

module.exports = {
  auth: authMiddleware,
  response: responseMiddleware,
  decrypt: decryptMiddleware,
  encrypt: encryptMiddleware,
  rateLimiter: rateLimiterMiddleware,
  jwt: jwtMiddleware
};
