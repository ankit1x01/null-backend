/**
 * GetPages Service
 * Handles getPages business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
const { Page, sequelize } = require('../../../shared/models');
const { Op } = sequelize.Sequelize;

/**
 * Get list of pages
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.page - Page number (0-indexed)
 * @param {number} data.per_page - Items per page
 * @param {boolean} data.published_only - Filter by published status
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getPages = async ({ requestId, page = 0, per_page = 20, published_only = false }) => {
  console.log(`[${requestId}] GetPages attempt`);
  
  try {
    const limit = Math.min(per_page, 100);
    const offset = page * limit;
    
    const where = {};
    if (published_only) {
      where.published = true;
    }

    const { count, rows } = await Page.findAndCountAll({
      where,
      limit,
      offset,
      order: [['title', 'ASC']]
    });
    
    console.log(`[${requestId}] GetPages successful: Found ${count} pages`);
    
    return {
      pages: rows,
      pagination: {
        page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit)
      }
    };
  } catch (error) {
    console.error(`[${requestId}] GetPages failed:`, error.message);
    throw new Error(JSON.stringify(constants.getPages.errorMessages.GETE0003));
  }
};

module.exports = getPages;
