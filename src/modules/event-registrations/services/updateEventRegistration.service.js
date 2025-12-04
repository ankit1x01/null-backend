/**
 * UpdateEventRegistration Service
 * Handles updateEventRegistration business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * UpdateEventRegistration operation
 * @param {Object} data - UpdateEventRegistration data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Registration ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updateEventRegistration = async ({ requestId, id, ...data }) => {
  console.log(`[${requestId}] UpdateEventRegistration attempt: ${id}`);
  
  try {
    const registration = await EventRegistration.findByPk(id);
    
    if (!registration) {
      throw new Error(JSON.stringify(constants.updateEventRegistration.errorMessages.UPDE0003));
    }

    await registration.update(data);
    
    console.log(`[${requestId}] UpdateEventRegistration successful`);
    return registration;
  } catch (error) {
    console.error(`[${requestId}] UpdateEventRegistration failed:`, error.message);
    throw error;
  }
};

module.exports = updateEventRegistration;
