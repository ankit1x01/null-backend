/**
 * CreateEventSessionComment Service
 * Handles createEventSessionComment business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * CreateEventSessionComment operation
 * @param {Object} data - CreateEventSessionComment data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventSessionComment } = require('../../../shared/models');

/**
 * CreateEventSessionComment operation
 * @param {Object} data - CreateEventSessionComment data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createEventSessionComment = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreateEventSessionComment attempt`);
  
  try {
    const comment = await EventSessionComment.create(data);
    
    console.log(`[${requestId}] CreateEventSessionComment successful: Created comment ${comment.id}`);
    return comment;
  } catch (error) {
    console.error(`[${requestId}] CreateEventSessionComment failed:`, error.message);
    throw new Error(JSON.stringify(constants.createEventSessionComment.errorMessages.CREAE0003));
  }
};

module.exports = createEventSessionComment;
