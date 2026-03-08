/**
 * GetChapterById Service
 * Handles getChapterById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { Chapter, ChapterLead, User, Event } = require('../../../shared/models');
const { sequelize } = require('../../../shared/database');

/**
 * GetChapterById operation
 * @param {Object} data - GetChapterById data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.id - Chapter ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getChapterById = async (params) => {
  const { requestId } = params;
  const id = params.id || params.chapterId;

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
      console.warn(`[${requestId}] Chapter ${id} not found in DB ${dbName}`);
      throw new Error(JSON.stringify(constants.getChapterById.errorMessages.GETCE0004));
    }

    console.log(`[${requestId}] GetChapterById successful: Found chapter ${chapter.name}`);
    return chapter;
  } catch (error) {
    console.error(`[${requestId}] GetChapterById failed:`, error);

    // Re-throw if it's already a formatted error
    if (error.message && error.message.startsWith('{')) {
      throw error;
    }

    // Include the original error message for debugging if it's not a formatted error
    const errorResponse = {
      ...constants.getChapterById.errorMessages.GETCE0003,
      message: `GetChapterById failed: ${error.message || 'Unknown error'}`
    };
    throw new Error(JSON.stringify(errorResponse));
  }
};

module.exports = getChapterById;
