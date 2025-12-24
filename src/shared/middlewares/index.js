/**
 * Shared Middlewares
 * Export all shared middlewares for use throughout the application
 */
const auth = require('./auth.middleware');
const jwt = require('./jwt.middleware');
const response = require('./response.middleware');
const encrypt = require('./encrypt.middleware');
const decrypt = require('./decrypt.middleware');
const rateLimiter = require('./rateLimiter.middleware');

module.exports = {
  auth,
  jwt: auth, // Remap jwt to auth middleware since verifyToken and isAdmin are there
  response,
  encrypt,
  decrypt,
  rateLimiter
};
