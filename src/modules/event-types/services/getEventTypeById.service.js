/**
 * GetEventTypeById Service
 * Handles getEventTypeById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * GetEventTypeById operation
 * @param {Object} data - GetEventTypeById data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventType } = require('../../../shared/models');

/**
 * GetEventTypeById operation
 * @param {Object} data - GetEventTypeById data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Event Type ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getEventTypeById = async ({ requestId, id }) => {
  console.log(`[${requestId}] GetEventTypeById attempt: ${id}`);
  
  try {
    const eventType = await EventType.findByPk(id);

    if (!eventType) {
      throw new Error(JSON.stringify(constants.getEventTypeById.errorMessages.GETE0003));
    }
    
    console.log(`[${requestId}] GetEventTypeById successful`);
    return eventType;
  } catch (error) {
    console.error(`[${requestId}] GetEventTypeById failed:`, error.message);
    throw error;
  }
};

module.exports = getEventTypeById;
