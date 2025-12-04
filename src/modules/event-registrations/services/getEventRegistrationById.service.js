/**
 * GetEventRegistrationById Service
 * Handles getEventRegistrationById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * GetEventRegistrationById operation
 * @param {Object} data - GetEventRegistrationById data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Registration ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getEventRegistrationById = async ({ requestId, id }) => {
  console.log(`[${requestId}] GetEventRegistrationById attempt: ${id}`);
  
  try {
    const registration = await EventRegistration.findByPk(id, {
      include: [
        {
          model: Event,
          as: 'event',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar']
        }
      ]
    });

    if (!registration) {
      throw new Error(JSON.stringify(constants.getEventRegistrationById.errorMessages.GETE0003));
    }
    
    console.log(`[${requestId}] GetEventRegistrationById successful`);
    return registration;
  } catch (error) {
    console.error(`[${requestId}] GetEventRegistrationById failed:`, error.message);
    throw error;
  }
};

module.exports = getEventRegistrationById;
