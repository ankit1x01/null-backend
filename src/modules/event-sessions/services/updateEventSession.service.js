/**
 * UpdateEventSession Service
 * Handles updateEventSession business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

const { EventSession } = require('../../../shared/models');

/**
 * UpdateEventSession operation
 * @param {Object} data - UpdateEventSession data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.id - Event Session ID
 * @param {Object} data.updates - Updates to apply
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updateEventSession = async ({ requestId, id, ...updates }) => {
  console.log(`[${requestId}] UpdateEventSession attempt: ${id}`);
  
  try {
    const session = await EventSession.findByPk(id);
    if (!session) {
      throw new Error('Event session not found');
    }

    await session.update(updates);
    
    console.log(`[${requestId}] UpdateEventSession successful`);
    return session;
  } catch (error) {
    console.error(`[${requestId}] UpdateEventSession failed:`, error.message);
    throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0003));
  }
};

module.exports = updateEventSession;
