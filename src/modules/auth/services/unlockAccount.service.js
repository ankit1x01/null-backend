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

  // Find user by unlock token
  const user = await User.findOne({
    where: { unlock_token: token }
  });

  if (!user) {
    console.log(`[${requestId}] Invalid unlock token`);
    throw new Error(JSON.stringify({
      code: 'AUTH0013',
      statusCode: 400,
      message: 'Invalid unlock token',
      result: null
    }));
  }

  // Check if already unlocked
  if (!user.locked_at) {
    console.log(`[${requestId}] Account already unlocked`);
    return {
      message: 'Your account is already unlocked. You can now login.',
      alreadyUnlocked: true
    };
  }

  // Unlock the account
  await user.update({
    locked_at: null,
    unlock_token: null,
    failed_attempts: 0
  });

  console.log(`[${requestId}] Account unlocked for user: ${user.email}`);

  return {
    message: 'Your account has been unlocked successfully. You can now login.',
    alreadyUnlocked: false
  };
};

module.exports = unlockAccount;
