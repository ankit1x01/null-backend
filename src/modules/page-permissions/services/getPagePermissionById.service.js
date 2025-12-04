/**
 * GetPagePermissionById Service
 * Handles getPagePermissionById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { PagePermission, Page, User } = require('../../../shared/models');

/**
 * GetPagePermissionById operation
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Permission ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getPagePermissionById = async ({ requestId, id }) => {
  console.log(`[${requestId}] GetPagePermissionById attempt: ${id}`);
  
  try {
    const permission = await PagePermission.findByPk(id, {
      include: [
        {
          model: Page,
          as: 'page',
          attributes: ['id', 'title', 'slug']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!permission) {
      throw new Error(JSON.stringify({
        code: 'PGPM0004',
        statusCode: 404,
        message: 'Page permission not found'
      }));
    }
    
    console.log(`[${requestId}] GetPagePermissionById successful`);
    return permission;
  } catch (error) {
    console.error(`[${requestId}] GetPagePermissionById failed:`, error.message);
    throw error;
  }
};

module.exports = getPagePermissionById;
