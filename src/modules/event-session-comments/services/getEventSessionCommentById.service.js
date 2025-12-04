/**
 * GetEventSessionCommentById Service
 * Handles getEventSessionCommentById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { EventSessionComment, EventSession, User } = require('../../../shared/models');

/**
 * GetEventSessionCommentById operation
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Comment ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getEventSessionCommentById = async ({ requestId, id }) => {
  console.log(`[${requestId}] GetEventSessionCommentById attempt: ${id}`);
  
  try {
    const comment = await EventSessionComment.findByPk(id, {
      include: [
        {
          model: EventSession,
          as: 'eventSession',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar']
        }
      ]
    });

    if (!comment) {
      throw new Error(JSON.stringify({
        code: 'ESCM0004',
        statusCode: 404,
        message: 'Comment not found'
      }));
    }
    
    console.log(`[${requestId}] GetEventSessionCommentById successful`);
    return comment;
  } catch (error) {
    console.error(`[${requestId}] GetEventSessionCommentById failed:`, error.message);
    throw error;
  }
};

module.exports = getEventSessionCommentById;
