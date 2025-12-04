/**
 * GetEventSessionById Service
 * Handles getEventSessionById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

const { EventSession, Event, User, EventSessionComment } = require('../../../shared/models');

/**
 * GetEventSessionById operation
 * @param {Object} data - GetEventSessionById data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.id - Event Session ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getEventSessionById = async ({ requestId, id }) => {
  console.log(`[${requestId}] GetEventSessionById attempt: ${id}`);
  
  try {
    const session = await EventSession.findByPk(id, {
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
        },
        {
          model: EventSessionComment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'avatar']
            }
          ]
        }
      ]
    });

    if (!session) {
      throw new Error('Event session not found');
    }
    
    console.log(`[${requestId}] GetEventSessionById successful`);
    return session;
  } catch (error) {
    console.error(`[${requestId}] GetEventSessionById failed:`, error.message);
    throw new Error(JSON.stringify(constants.getEventSessionById.errorMessages.GETEE0003));
  }
};

module.exports = getEventSessionById;
