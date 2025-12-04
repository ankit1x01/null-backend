/**
 * GetEventSessionComments Service
 * Handles getEventSessionComments business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { EventSessionComment, EventSession, User, sequelize } = require('../../../shared/models');
const { Op } = sequelize.Sequelize;

/**
 * Get list of event session comments
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.page - Page number (0-indexed)
 * @param {number} data.per_page - Items per page
 * @param {number} data.event_session_id - Filter by event session ID
 * @param {number} data.user_id - Filter by user ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getEventSessionComments = async ({ requestId, page = 0, per_page = 20, event_session_id, user_id }) => {
  console.log(`[${requestId}] GetEventSessionComments attempt`);
  
  try {
    const limit = Math.min(per_page, 100);
    const offset = page * limit;
    
    const where = {};
    if (event_session_id) where.event_session_id = event_session_id;
    if (user_id) where.user_id = user_id;

    const { count, rows } = await EventSessionComment.findAndCountAll({
      where,
      include: [
        {
          model: EventSession,
          as: 'eventSession',
          attributes: ['id', 'name']
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
    
    console.log(`[${requestId}] GetEventSessionComments successful: Found ${count} comments`);
    
    return {
      comments: rows,
      pagination: {
        page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit)
      }
    };
  } catch (error) {
    console.error(`[${requestId}] GetEventSessionComments failed:`, error.message);
    throw new Error(JSON.stringify({
      code: 'ESCM0003',
      statusCode: 500,
      message: 'Failed to fetch event session comments'
    }));
  }
};

module.exports = getEventSessionComments;
