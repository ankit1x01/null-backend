/**
 * GetChapterById Service
 * Handles getChapterById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { Chapter, ChapterLead, User, Event } = require('../../../shared/models');

/**
 * GetChapterById operation
 * @param {Object} data - GetChapterById data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.id - Chapter ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getChapterById = async ({ requestId, id }) => {
  console.log(`[${requestId}] GetChapterById attempt for chapter ${id}`);

  try {
    const chapter = await Chapter.findByPk(id, {
      include: [
        {
          model: ChapterLead,
          as: 'chapterLeads',
          where: { active: true },
          required: false,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email', 'handle', 'avatar']
            }
          ]
        },
        {
          model: Event,
          as: 'events',
          where: { public: true },
          required: false,
          limit: 10,
          order: [['start_time', 'DESC']]
        }
      ]
    });

    if (!chapter) {
      throw new Error(JSON.stringify(constants.getChapterById.errorMessages.GETCE0001));
    }

    console.log(`[${requestId}] GetChapterById successful: Found chapter ${chapter.name}`);
    return chapter;
  } catch (error) {
    console.error(`[${requestId}] GetChapterById failed:`, error.message);

    // Re-throw if it's already a formatted error
    if (error.message.startsWith('{')) {
      throw error;
    }

    throw new Error(JSON.stringify(constants.getChapterById.errorMessages.GETCE0003));
  }
};

module.exports = getChapterById;
