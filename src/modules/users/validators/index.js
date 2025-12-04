/**
 * Users Validators
 * Export all users validators
 */
const getMe = require('./getMe.validator');
const getUserEvents = require('./getUserEvents.validator');
const getUserSessions = require('./getUserSessions.validator');

module.exports = {
  getMe,
  getUserEvents,
  getUserSessions,
};
