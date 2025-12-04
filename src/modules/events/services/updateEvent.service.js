/**
 * UpdateEvent Service
 * Handles updateEvent business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { Event } = require('../../../shared/models');
const slugify = require('slugify');

/**
 * UpdateEvent operation
 * @param {Object} data - UpdateEvent data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Event ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updateEvent = async ({ requestId, id, ...data }) => {
  console.log(`[${requestId}] UpdateEvent attempt: ${id}`);
  
  try {
    const event = await Event.findByPk(id);
    
    if (!event) {
      throw new Error(JSON.stringify({
        code: 'EVNT0003',
        statusCode: 404,
        message: 'Event not found'
      }));
    }

    if (data.name && !data.slug) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    await event.update(data);
    
    console.log(`[${requestId}] UpdateEvent successful`);
    return event;
  } catch (error) {
    console.error(`[${requestId}] UpdateEvent failed:`, error.message);
    throw error;
  }
};

module.exports = updateEvent;
