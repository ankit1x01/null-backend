/**
 * Reset Password Service
 * Handles password reset with token
 */
const bcrypt = require('bcryptjs');
const { User } = require('../../../shared/models');
const moduleConstants = require('../constants');

/**
 * Reset password with token
 * @param {Object} data - Request data
 * @param {string} data.token - Reset token
 * @param {string} data.password - New password
 * @returns {Promise<Object>} - Result message
 */
const resetPassword = async ({ token, password, requestId }) => {
  console.log(`[${requestId}] Password reset attempt with token`);

  // Find user by reset token
  const user = await User.findOne({
    where: { reset_password_token: token }
  });

  if (!user) {
    console.log(`[${requestId}] Invalid or expired reset token`);
    throw new Error(JSON.stringify({
      code: 'AUTH0010',
      statusCode: 400,
      message: 'Invalid or expired reset token',
      result: null
    }));
  }

  // Check if token is expired (2 hours)
  const tokenAge = Date.now() - new Date(user.reset_password_sent_at).getTime();
  if (tokenAge > 2 * 60 * 60 * 1000) {
    console.log(`[${requestId}] Reset token expired`);
    throw new Error(JSON.stringify({
      code: 'AUTH0011',
      statusCode: 400,
      message: 'Reset token has expired. Please request a new one.',
      result: null
    }));
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update password and clear reset token
  await user.update({
    encrypted_password: hashedPassword,
    reset_password_token: null,
    reset_password_sent_at: null
  });

  console.log(`[${requestId}] Password reset successful for user: ${user.email}`);

  return {
    message: 'Your password has been reset successfully. You can now login with your new password.'
  };
};

module.exports = resetPassword;
