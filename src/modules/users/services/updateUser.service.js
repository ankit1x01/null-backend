/**
 * UpdateUser Service
 * Handles updateUser business logic
 */
const { User } = require('../../../shared/models');

/**
 * Update user
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.userId - User ID
 * @param {Object} data.updateData - Data to update
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updateUser = async ({ requestId, userId, ...updateData }) => {
  console.log(`[${requestId}] UpdateUser attempt: ${userId}`);
  
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await user.update(updateData);
    
    console.log(`[${requestId}] UpdateUser successful`);
    return user;
  } catch (error) {
    console.error(`[${requestId}] UpdateUser failed:`, error.message);
    throw new Error(JSON.stringify({
      code: 'USERS0006',
      statusCode: 500,
      message: 'Failed to update user'
    }));
  }
};

module.exports = updateUser;
