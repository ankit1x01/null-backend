/**
 * Login Service
 * Handles user authentication logic
 */
const jwt = require('jsonwebtoken');
const moduleConstants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { User, UserApiToken } = require('../../../shared/models');

/**
 * Validate user credentials
 * @param {Object} data - Login data
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.ipAddress - Client IP address
 * @param {string} data.userAgent - Client user agent
 * @returns {Promise<Object>} - User data and token if valid
 * @throws {Error} - If user not found or invalid credentials
 */
const login = async ({ email, password, requestId, ipAddress, userAgent }) => {
  console.log(`[${requestId}] Login attempt for email: ${email}`);

  // Find user by email
  const user = await User.findOne({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    console.log(`[${requestId}] User not found: ${email}`);
    throw new Error(JSON.stringify(moduleConstants.login.errorMessages.USRE0004));
  }

  // Check if email is confirmed
  if (!user.confirmed_at) {
    console.log(`[${requestId}] Email not confirmed for user: ${email}`);
    throw new Error(JSON.stringify({
      code: 'USRE0005',
      statusCode: 403,
      message: 'Please confirm your email before logging in'
    }));
  }

  // Verify password
  const isValid = await user.validatePassword(password);

  if (!isValid) {
    console.log(`[${requestId}] Invalid password for user: ${email}`);
    throw new Error(JSON.stringify(moduleConstants.login.errorMessages.USRE0003));
  }

  // Update sign in tracking
  await user.update({
    sign_in_count: user.sign_in_count + 1,
    last_sign_in_at: user.current_sign_in_at,
    last_sign_in_ip: user.current_sign_in_ip,
    current_sign_in_at: new Date(),
    current_sign_in_ip: ipAddress
  });

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET || sharedConstants.auth.jwt.DEFAULT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || sharedConstants.auth.jwt.EXPIRY, algorithm: 'HS256' }
  );

  // Create API token for tracking (expires in 30 days like the JWT)
  const expireAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await UserApiToken.create({
    user_id: user.id,
    token: token,
    client_name: 'web',
    ip_address: ipAddress,
    user_agent: userAgent,
    last_used_at: new Date(),
    expire_at: expireAt
  });

  console.log(`[${requestId}] Login successful for user: ${email}`);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      handle: user.handle,
      avatar: user.avatar || user.getGravatarUrl()
    },
    token,
    expire_at: expireAt
  };
}

module.exports = login;
