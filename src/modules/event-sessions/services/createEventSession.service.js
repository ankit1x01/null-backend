/**
 * CreateEventSession Service
 * Handles createEventSession business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

const { EventSession } = require('../../../shared/models');

/**
 * CreateEventSession operation
 * @param {Object} data - CreateEventSession data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createEventSession = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreateEventSession attempt`);
  
  try {
    const session = await EventSession.create(data);
    
    console.log(`[${requestId}] CreateEventSession successful: Created session ${session.id}`);
    return session;
  } catch (error) {
    console.error(`[${requestId}] CreateEventSession failed:`, error.message);
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0003));
  }
};

module.exports = createEventSession;
