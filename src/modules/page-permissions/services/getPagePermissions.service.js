/**
 * GetPagePermissions Service
 * Handles getPagePermissions business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { PagePermission, Page, User, sequelize } = require('../../../shared/models');
const { Op } = sequelize.Sequelize;

/**
 * Get list of page permissions
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.page - Page number (0-indexed)
 * @param {number} data.per_page - Items per page
 * @param {number} data.page_id - Filter by page ID
 * @param {number} data.user_id - Filter by user ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getPagePermissions = async ({ requestId, page = 0, per_page = 20, page_id, user_id }) => {
  console.log(`[${requestId}] GetPagePermissions attempt`);
  
  try {
    const limit = Math.min(per_page, 100);
    const offset = page * limit;
    
    const where = {};
    if (page_id) where.page_id = page_id;
    if (user_id) where.user_id = user_id;

    const { count, rows } = await PagePermission.findAndCountAll({
      where,
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
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });
    
    console.log(`[${requestId}] GetPagePermissions successful: Found ${count} permissions`);
    
    return {
      pagePermissions: rows,
      pagination: {
        page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit)
      }
    };
  } catch (error) {
    console.error(`[${requestId}] GetPagePermissions failed:`, error.message);
    throw new Error(JSON.stringify({
      code: 'PGPM0003',
      statusCode: 500,
      message: 'Failed to fetch page permissions'
    }));
  }
};

module.exports = getPagePermissions;
