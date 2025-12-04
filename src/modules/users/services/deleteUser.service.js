/**
 * DeleteUser Service
 * Handles deleteUser business logic
 */
const { User } = require('../../../shared/models');

/**
 * Delete user
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.userId - User ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deleteUser = async ({ requestId, userId }) => {
  console.log(`[${requestId}] DeleteUser attempt: ${userId}`);
  
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
    
    console.log(`[${requestId}] DeleteUser successful`);
    return { success: true };
  } catch (error) {
    console.error(`[${requestId}] DeleteUser failed:`, error.message);
    throw new Error(JSON.stringify({
      code: 'USERS0007',
      statusCode: 500,
      message: 'Failed to delete user'
    }));
  }
};

module.exports = deleteUser;
