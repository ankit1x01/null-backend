/**
 * GetEventRegistrations Service
 * Handles getEventRegistrations business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * GetEventRegistrations operation
 * @param {Object} data - GetEventRegistrations data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventRegistration, Event, User, sequelize } = require('../../../shared/models');
const { Op } = sequelize.Sequelize;

/**
 * Get list of event registrations
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.page - Page number (0-indexed)
 * @param {number} data.per_page - Items per page
 * @param {number} data.event_id - Filter by event ID
 * @param {number} data.user_id - Filter by user ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getEventRegistrations = async ({ requestId, page = 0, per_page = 20, event_id, user_id }) => {
  console.log(`[${requestId}] GetEventRegistrations attempt`);
  
  try {
    const limit = Math.min(per_page, 100);
    const offset = page * limit;
    
    const where = {};
    if (event_id) where.event_id = event_id;
    if (user_id) where.user_id = user_id;

    const { count, rows } = await EventRegistration.findAndCountAll({
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
      order: [['created_at', 'DESC']]
    });
    
    console.log(`[${requestId}] GetEventRegistrations successful: Found ${count} registrations`);
    
    return {
      registrations: rows,
      pagination: {
        page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit)
      }
    };
  } catch (error) {
    console.error(`[${requestId}] GetEventRegistrations failed:`, error.message);
    throw new Error(JSON.stringify(constants.getEventRegistrations.errorMessages.GETE0003));
  }
};

module.exports = getEventRegistrations;
