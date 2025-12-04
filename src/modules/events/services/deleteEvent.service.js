/**
 * DeleteEvent Service
 * Handles deleteEvent business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { Event } = require('../../../shared/models');

/**
 * DeleteEvent operation
 * @param {Object} data - DeleteEvent data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Event ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deleteEvent = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeleteEvent attempt: ${id}`);
  
  try {
    const event = await Event.findByPk(id);
    
    if (!event) {
      throw new Error(JSON.stringify({
        code: 'EVNT0003',
        statusCode: 404,
        message: 'Event not found'
      }));
    }

    await event.destroy();
    
    console.log(`[${requestId}] DeleteEvent successful`);
    return { success: true, id };
  } catch (error) {
    console.error(`[${requestId}] DeleteEvent failed:`, error.message);
    throw error;
  }
};

module.exports = deleteEvent;
