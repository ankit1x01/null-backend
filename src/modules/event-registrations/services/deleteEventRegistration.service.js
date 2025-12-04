/**
 * DeleteEventRegistration Service
 * Handles deleteEventRegistration business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * DeleteEventRegistration operation
 * @param {Object} data - DeleteEventRegistration data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Registration ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deleteEventRegistration = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeleteEventRegistration attempt: ${id}`);
  
  try {
    const registration = await EventRegistration.findByPk(id);
    
    if (!registration) {
      throw new Error(JSON.stringify(constants.deleteEventRegistration.errorMessages.DELE0003));
    }

    await registration.destroy();
    
    console.log(`[${requestId}] DeleteEventRegistration successful`);
    return { success: true, id };
  } catch (error) {
    console.error(`[${requestId}] DeleteEventRegistration failed:`, error.message);
    throw error;
  }
};

module.exports = deleteEventRegistration;
