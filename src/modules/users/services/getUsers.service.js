/**
 * GetUsers Service
 * Handles getUsers business logic
 */
const { User } = require('../../../shared/models');

/**
 * Get list of users
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getUsers = async ({ requestId }) => {
  console.log(`[${requestId}] GetUsers attempt`);
  
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'avatar'],
      order: [['name', 'ASC']]
    });
    
    console.log(`[${requestId}] GetUsers successful: Found ${users.length} users`);
    
    return {
      users
    };
  } catch (error) {
    console.error(`[${requestId}] GetUsers failed:`, error.message);
    throw new Error(JSON.stringify({
      code: 'USERS0004',
      statusCode: 500,
      message: 'Failed to fetch users'
    }));
  }
};

module.exports = getUsers;
