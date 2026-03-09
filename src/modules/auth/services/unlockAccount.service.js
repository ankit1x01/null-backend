/**
 * Unlock Account Service
 * Handles account unlock with token
 */
const { User } = require('../../../shared/models');

/**
 * Unlock account with token
 * @param {Object} data - Request data
 * @param {string} data.token - Unlock token
 * @returns {Promise<Object>} - Result message
 */
const unlockAccount = async ({ token, requestId }) => {
  console.log(`[${requestId}] Account unlock attempt with token`);

  // Feature is currently disabled as columns (unlock_token, locked_at, failed_attempts)
  // do not exist in the remote database schema.
  throw new Error(JSON.stringify({
    code: 'AUTH0013',
    statusCode: 400,
    message: 'Account unlock feature is currently unavailable',
    result: null
  }));
};

module.exports = unlockAccount;
