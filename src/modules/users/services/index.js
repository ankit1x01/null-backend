/**
 * Users Services
 * Export all users services
 */
const getMe = require('./getMe.service');
const getUserEvents = require('./getUserEvents.service');
const getUserSessions = require('./getUserSessions.service');
const getUsers = require('./getUsers.service');
const getUserById = require('./getUserById.service');
const updateUser = require('./updateUser.service');
const deleteUser = require('./deleteUser.service');

module.exports = {
  getMe,
  getUserEvents,
  getUserSessions,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
