/**
 * Auth Service
 * Central export point for all authentication-related services
 */

// Import individual services
const login = require('./login.service');
const register = require('./register.service');

/**
 * Export all services
 */
module.exports = {
  login,
  register
};
