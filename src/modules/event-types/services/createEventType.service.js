/**
 * CreateEventType Service
 * Handles createEventType business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * CreateEventType operation
 * @param {Object} data - CreateEventType data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventType } = require('../../../shared/models');

/**
 * CreateEventType operation
 * @param {Object} data - CreateEventType data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createEventType = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreateEventType attempt`);
  
  try {
    const eventType = await EventType.create(data);
    
    console.log(`[${requestId}] CreateEventType successful: Created type ${eventType.id}`);
    return eventType;
  } catch (error) {
    console.error(`[${requestId}] CreateEventType failed:`, error.message);
    throw new Error(JSON.stringify(constants.createEventType.errorMessages.CREAE0003));
  }
};

module.exports = createEventType;
