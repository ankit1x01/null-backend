/**
 * CreateEventRegistration Service
 * Handles createEventRegistration business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * CreateEventRegistration operation
 * @param {Object} data - CreateEventRegistration data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventRegistration } = require('../../../shared/models');

/**
 * CreateEventRegistration operation
 * @param {Object} data - CreateEventRegistration data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createEventRegistration = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreateEventRegistration attempt`);
  
  try {
    const registration = await EventRegistration.create(data);
    
    console.log(`[${requestId}] CreateEventRegistration successful: Created registration ${registration.id}`);
    return registration;
  } catch (error) {
    console.error(`[${requestId}] CreateEventRegistration failed:`, error.message);
    throw new Error(JSON.stringify(constants.createEventRegistration.errorMessages.CREAE0003));
  }
};

module.exports = createEventRegistration;
