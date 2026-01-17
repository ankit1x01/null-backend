/**
 * Resend Confirmation Email Service
 * Handles resending confirmation email
 */
const crypto = require('crypto');
const { User } = require('../../../shared/models');
const emailService = require('../../../shared/services/email.service');

/**
 * Resend confirmation email
 * @param {Object} data - Request data
 * @param {string} data.email - User email
 * @returns {Promise<Object>} - Result message
 */
const resendConfirmation = async ({ email, requestId }) => {
  console.log(`[${requestId}] Resend confirmation request for: ${email}`);

  // Find user by email
  const user = await User.findOne({
    where: { email: email.toLowerCase() }
  });

  // Always return success to prevent email enumeration
  if (!user) {
    console.log(`[${requestId}] User not found, but returning success to prevent enumeration`);
    return {
      message: 'If an unconfirmed account exists with that email, you will receive confirmation instructions.'
    };
  }

  // Check if already confirmed
  if (user.confirmed_at) {
    console.log(`[${requestId}] User already confirmed`);
    return {
      message: 'Your email is already confirmed. You can login.',
      alreadyConfirmed: true
    };
  }

  // Generate new confirmation token
  const confirmationToken = crypto.randomBytes(32).toString('hex');

  // Update confirmation token
  await user.update({
    confirmation_token: confirmationToken,
    confirmation_sent_at: new Date()
  });

  // Send confirmation email
  try {
    await emailService.sendConfirmationEmail({
      user: { email: user.email, name: user.name },
      confirmationToken
    });
    console.log(`[${requestId}] Confirmation email resent to: ${email}`);
  } catch (error) {
    console.error(`[${requestId}] Failed to send confirmation email:`, error);
    // Don't throw - still return success to prevent enumeration
  }

  return {
    message: 'If an unconfirmed account exists with that email, you will receive confirmation instructions.'
  };
};

module.exports = resendConfirmation;
