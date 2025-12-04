/**
 * GetChapterLeads Service
 * Handles getChapterLeads business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * Get list of chapter leads
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.page - Page number (0-indexed)
 * @param {number} data.per_page - Items per page
 * @param {number} data.chapter_id - Filter by chapter ID
 * @param {boolean} data.active_only - Filter by active status
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { ChapterLead, Chapter, User, sequelize } = require('../../../shared/models');
const { Op } = sequelize.Sequelize;

/**
 * Get list of chapter leads
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.page - Page number (0-indexed)
 * @param {number} data.per_page - Items per page
 * @param {number} data.chapter_id - Filter by chapter ID
 * @param {boolean} data.active_only - Filter by active status
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getChapterLeads = async ({ requestId, page = 0, per_page = 20, chapter_id, active_only = false }) => {
  console.log(`[${requestId}] GetChapterLeads attempt`);
  
  try {
    const limit = Math.min(per_page, 100);
    const offset = page * limit;
    
    const where = {};
    if (chapter_id) where.chapter_id = chapter_id;
    if (active_only) where.active = true;

    const { count, rows } = await ChapterLead.findAndCountAll({
      where,
      include: [
        {
          model: Chapter,
          as: 'chapter',
          attributes: ['id', 'name', 'city']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar']
        }
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });
    
    console.log(`[${requestId}] GetChapterLeads successful: Found ${count} leads`);
    
    return {
      chapterLeads: rows,
      pagination: {
        page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit)
      }
    };
  } catch (error) {
    console.error(`[${requestId}] GetChapterLeads failed:`, error.message);
    throw new Error(JSON.stringify(constants.getChapterLeads.errorMessages.GETE0003));
  }
};

module.exports = getChapterLeads;
