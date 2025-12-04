/**
 * DeleteEventType Service
 * Handles deleteEventType business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * DeleteEventType operation
 * @param {Object} data - DeleteEventType data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventType } = require('../../../shared/models');

/**
 * DeleteEventType operation
 * @param {Object} data - DeleteEventType data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Event Type ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deleteEventType = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeleteEventType attempt: ${id}`);
  
  try {
    const eventType = await EventType.findByPk(id);
    
    if (!eventType) {
      throw new Error(JSON.stringify(constants.deleteEventType.errorMessages.DELE0003));
    }

    await eventType.destroy();
    
    console.log(`[${requestId}] DeleteEventType successful`);
    return { success: true, id };
  } catch (error) {
    console.error(`[${requestId}] DeleteEventType failed:`, error.message);
    throw error;
  }
};

module.exports = deleteEventType;
