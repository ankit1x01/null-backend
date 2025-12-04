/**
 * UpdateEventSessionComment Service
 * Handles updateEventSessionComment business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * UpdateEventSessionComment operation
 * @param {Object} data - UpdateEventSessionComment data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventSessionComment } = require('../../../shared/models');

/**
 * UpdateEventSessionComment operation
 * @param {Object} data - UpdateEventSessionComment data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Comment ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updateEventSessionComment = async ({ requestId, id, ...data }) => {
  console.log(`[${requestId}] UpdateEventSessionComment attempt: ${id}`);
  
  try {
    const comment = await EventSessionComment.findByPk(id);
    
    if (!comment) {
      throw new Error(JSON.stringify(constants.updateEventSessionComment.errorMessages.UPDE0003));
    }

    await comment.update(data);
    
    console.log(`[${requestId}] UpdateEventSessionComment successful`);
    return comment;
  } catch (error) {
    console.error(`[${requestId}] UpdateEventSessionComment failed:`, error.message);
    throw error;
  }
};

module.exports = updateEventSessionComment;
