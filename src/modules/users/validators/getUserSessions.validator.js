/**
 * GetUserSessions Validator
 * Validates getUserSessions request data
 */
const constants = require('../constants');

/**
 * Validate getUserSessions request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getUserSessions = (req) => {
  const user_id = req.params.id || req.user?.id;

  // Validate user_id is provided
  if (!user_id) {
    throw new Error(JSON.stringify(constants.getUserSessions.errorMessages.GETUE0001));
  }

  // Validate user_id is a valid integer
  if (!Number.isInteger(Number(user_id))) {
    throw new Error(JSON.stringify(constants.getUserSessions.errorMessages.GETUE0002));
  }

  return {
    user_id: Number(user_id)
  };
};

module.exports = getUserSessions;
