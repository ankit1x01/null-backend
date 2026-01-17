/**
 * Confirm Email Service
 * Handles email confirmation with token
 */
const { User } = require('../../../shared/models');

/**
 * Confirm email with token
 * @param {Object} data - Request data
 * @param {string} data.token - Confirmation token
 * @returns {Promise<Object>} - Result message
 */
const confirmEmail = async ({ token, requestId }) => {
  console.log(`[${requestId}] Email confirmation attempt with token`);

  // Find user by confirmation token
  const user = await User.findOne({
    where: { confirmation_token: token }
  });

  if (!user) {
    console.log(`[${requestId}] Invalid confirmation token`);
    throw new Error(JSON.stringify({
      code: 'AUTH0012',
      statusCode: 400,
      message: 'Invalid confirmation token',
      result: null
    }));
  }

  // Check if already confirmed
  if (user.confirmed_at) {
    console.log(`[${requestId}] Email already confirmed`);
    return {
      message: 'Your email has already been confirmed. You can now login.',
      alreadyConfirmed: true
    };
  }

  // Confirm the email
  await user.update({
    confirmed_at: new Date(),
    confirmation_token: null
  });

  console.log(`[${requestId}] Email confirmed for user: ${user.email}`);

  return {
    message: 'Your email has been confirmed successfully. You can now login.',
    alreadyConfirmed: false
  };
};

module.exports = confirmEmail;
