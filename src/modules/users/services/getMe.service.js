/**
 * GetMe Service
 * Returns current authenticated user information
 */
const { User } = require('../../../shared/models');

/**
 * Get current user information
 * @param {Object} data - Request data
 * @param {number} data.userId - User ID from JWT
 * @returns {Promise<Object>} - User information
 */
const getMe = async ({ userId }) => {
  const user = await User.findByPk(userId, {
    attributes: [
      'id', 'email', 'name', 'homepage', 'about_me',
      'twitter_handle', 'facebook_profile', 'github_profile',
      'linkedin_profile', 'handle', 'avatar',
      'created_at', 'updated_at'
    ]
  });

  if (!user) {
    throw new Error(JSON.stringify({
      code: 'USER0001',
      statusCode: 404,
      message: 'User not found'
    }));
  }

  return {
    ...user.toJSON(),
    avatar: user.avatar || user.getGravatarUrl()
  };
};

module.exports = getMe;
