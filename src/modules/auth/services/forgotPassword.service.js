/**
 * Forgot Password Service
 * Handles password reset request
 */
const crypto = require('crypto');
const { User } = require('../../../shared/models');
const emailService = require('../../../shared/services/email.service');

/**
 * Request password reset
 * @param {Object} data - Request data
 * @param {string} data.email - User email
 * @returns {Promise<Object>} - Result message
 */
const forgotPassword = async ({ email, requestId }) => {
  console.log(`[${requestId}] Password reset request for: ${email}`);

  // Find user by email
  const user = await User.findOne({
    where: { email: email.toLowerCase() }
  });

  // Always return success to prevent email enumeration
  if (!user) {
    console.log(`[${requestId}] User not found, but returning success to prevent enumeration`);
    return {
      message: 'If an account exists with that email, you will receive password reset instructions.'
    };
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours

  // Save reset token to user
  await user.update({
    reset_password_token: resetToken,
    reset_password_sent_at: new Date()
  });

  // Send password reset email
  try {
    await emailService.sendPasswordResetEmail({
      user: { email: user.email, name: user.name },
      resetToken
    });
    console.log(`[${requestId}] Password reset email sent to: ${email}`);
  } catch (error) {
    console.error(`[${requestId}] Failed to send password reset email:`, error);
    // Don't throw - still return success to prevent enumeration
  }

  return {
    message: 'If an account exists with that email, you will receive password reset instructions.'
  };
};

module.exports = forgotPassword;
