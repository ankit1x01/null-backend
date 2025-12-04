/**
 * UpdateEventType Service
 * Handles updateEventType business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * UpdateEventType operation
 * @param {Object} data - UpdateEventType data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventType } = require('../../../shared/models');

/**
 * UpdateEventType operation
 * @param {Object} data - UpdateEventType data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Event Type ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updateEventType = async ({ requestId, id, ...data }) => {
  console.log(`[${requestId}] UpdateEventType attempt: ${id}`);
  
  try {
    const eventType = await EventType.findByPk(id);
    
    if (!eventType) {
      throw new Error(JSON.stringify(constants.updateEventType.errorMessages.UPDE0003));
    }

    await eventType.update(data);
    
    console.log(`[${requestId}] UpdateEventType successful`);
    return eventType;
  } catch (error) {
    console.error(`[${requestId}] UpdateEventType failed:`, error.message);
    throw error;
  }
};

module.exports = updateEventType;
