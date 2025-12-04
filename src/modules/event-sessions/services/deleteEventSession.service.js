/**
 * DeleteEventSession Service
 * Handles deleteEventSession business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

const { EventSession } = require('../../../shared/models');

/**
 * DeleteEventSession operation
 * @param {Object} data - DeleteEventSession data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.id - Event Session ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deleteEventSession = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeleteEventSession attempt: ${id}`);
  
  try {
    const session = await EventSession.findByPk(id);
    if (!session) {
      throw new Error('Event session not found');
    }

    await session.destroy();
    
    console.log(`[${requestId}] DeleteEventSession successful`);
    return { success: true };
  } catch (error) {
    console.error(`[${requestId}] DeleteEventSession failed:`, error.message);
    throw new Error(JSON.stringify(constants.deleteEventSession.errorMessages.DELEE0003));
  }
};

module.exports = deleteEventSession;
