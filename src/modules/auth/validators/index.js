/**
 * Auth module validators
 * Contains validation logic for authentication operations
 */

// Import individual validators
const login = require('./login.validator');
const register = require('./register.validator');

/**
 * Export all validators
 */
module.exports = {
  login,
  register
};
