/**
 * CreateEvent Service
 * Handles createEvent business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { Event } = require('../../../shared/models');
const slugify = require('slugify');

/**
 * CreateEvent operation
 * @param {Object} data - CreateEvent data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createEvent = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreateEvent attempt`);
  
  try {
    if (data.name && !data.slug) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    const event = await Event.create(data);
    
    console.log(`[${requestId}] CreateEvent successful: Created event ${event.id}`);
    return event;
  } catch (error) {
    console.error(`[${requestId}] CreateEvent failed:`, error.message);
    throw new Error(JSON.stringify(sharedConstants.serverError));
  }
};

module.exports = createEvent;
