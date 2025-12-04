/**
 * DeleteEventSessionComment Service
 * Handles deleteEventSessionComment business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * DeleteEventSessionComment operation
 * @param {Object} data - DeleteEventSessionComment data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { EventSessionComment } = require('../../../shared/models');

/**
 * DeleteEventSessionComment operation
 * @param {Object} data - DeleteEventSessionComment data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Comment ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deleteEventSessionComment = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeleteEventSessionComment attempt: ${id}`);
  
  try {
    const comment = await EventSessionComment.findByPk(id);
    
    if (!comment) {
      throw new Error(JSON.stringify(constants.deleteEventSessionComment.errorMessages.DELE0003));
    }

    await comment.destroy();
    
    console.log(`[${requestId}] DeleteEventSessionComment successful`);
    return { success: true, id };
  } catch (error) {
    console.error(`[${requestId}] DeleteEventSessionComment failed:`, error.message);
    throw error;
  }
};

module.exports = deleteEventSessionComment;
