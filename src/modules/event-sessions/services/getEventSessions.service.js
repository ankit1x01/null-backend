/**
 * GetEventSessions Service
 * Handles getEventSessions business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

const { EventSession, Event, User, sequelize } = require('../../../shared/models');
const { Op } = sequelize.Sequelize;

/**
 * Get list of event sessions
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.page - Page number (0-indexed)
 * @param {number} data.per_page - Items per page
 * @param {number} data.event_id - Filter by event ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getEventSessions = async ({ requestId, page = 0, per_page = 20, event_id }) => {
  console.log(`[${requestId}] GetEventSessions attempt`);
  
  try {
    const limit = Math.min(per_page, 100);
    const offset = page * limit;
    
    const where = {};
    if (event_id) {
      where.event_id = event_id;
    }

    const { count, rows } = await EventSession.findAndCountAll({
      where,
      include: [
        {
          model: Event,
          as: 'event',
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
      order: [['start_time', 'ASC']]
    });
    
    console.log(`[${requestId}] GetEventSessions successful: Found ${count} sessions`);
    
    return {
      sessions: rows,
      pagination: {
        page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit)
      }
    };
  } catch (error) {
    console.error(`[${requestId}] GetEventSessions failed:`, error.message);
    throw new Error(JSON.stringify(constants.getEventSessions.errorMessages.GETE0003));
  }
};

module.exports = getEventSessions;
