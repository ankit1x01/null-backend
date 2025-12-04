/**
 * GetUserById Service
 * Handles getUserById business logic
 */
const { User } = require('../../../shared/models');

/**
 * Get user by ID
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.userId - User ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getUserById = async ({ requestId, userId }) => {
  console.log(`[${requestId}] GetUserById attempt: ${userId}`);
  
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['encrypted_password', 'reset_password_token', 'confirmation_token'] }
    });

    if (!user) {
      throw new Error('User not found');
    }
    
    console.log(`[${requestId}] GetUserById successful`);
    return user;
  } catch (error) {
    console.error(`[${requestId}] GetUserById failed:`, error.message);
    throw new Error(JSON.stringify({
      code: 'USERS0005',
      statusCode: 404,
      message: 'User not found'
    }));
  }
};

module.exports = getUserById;
