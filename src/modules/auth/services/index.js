/**
 * Auth Service
 * Central export point for all authentication-related services
 */

// Import individual services
const login = require('./login.service');
const register = require('./register.service');
const forgotPassword = require('./forgotPassword.service');
const resetPassword = require('./resetPassword.service');
const confirmEmail = require('./confirmEmail.service');
const resendConfirmation = require('./resendConfirmation.service');
const unlockAccount = require('./unlockAccount.service');

/**
 * Export all services
 */
module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  confirmEmail,
  resendConfirmation,
  unlockAccount
};
