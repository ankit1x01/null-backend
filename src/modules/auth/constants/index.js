/**
 * Auth module constants
 * Central export point for all authentication-related constants
 */

// Import individual constants
const login = require('./login.constants');
const register = require('./register.constants');

// Export all constants
module.exports = {
  // Authentication specific constants
  login,
  register
};
