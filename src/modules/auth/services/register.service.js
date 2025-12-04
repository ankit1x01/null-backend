/**
 * Register Service
 * Handles user registration logic
 */
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moduleConstants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { User } = require('../../../shared/models');

/**
 * Register a new user
 * @param {Object} data - Registration data
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @param {string} data.name - User name
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Created user and confirmation message
 * @throws {Error} - If email already exists
 */
const register = async ({ email, password, name, requestId }) => {
  console.log(`[${requestId}] Registration attempt for email: ${email}`);

  // Check if user already exists
  const existingUser = await User.findOne({
    where: { email: email.toLowerCase() }
  });

  if (existingUser) {
    console.log(`[${requestId}] Email already exists: ${email}`);
    throw new Error(JSON.stringify(moduleConstants.register.errorMessages.USRE0007));
  }

  // Generate confirmation token
  const confirmationToken = crypto.randomBytes(32).toString('hex');

  // Create new user (password will be automatically hashed by the model hook)
  const user = await User.create({
    email: email.toLowerCase(),
    encrypted_password: password,
    name: name,
    confirmation_token: confirmationToken,
    confirmation_sent_at: new Date()
  });

  console.log(`[${requestId}] Registration successful for user: ${email}`);

  // TODO: Send confirmation email
  // await sendConfirmationEmail(user.email, confirmationToken);

  // Create a user object without sensitive data
  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    name: user.name,
    handle: user.handle
  };

  return {
    user: userWithoutPassword,
    message: 'Registration successful! Please check your email to confirm your account.'
  };
}

module.exports = register;
