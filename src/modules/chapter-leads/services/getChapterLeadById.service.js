/**
 * GetChapterLeadById Service
 * Handles getChapterLeadById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * GetChapterLeadById operation
 * @param {Object} data - GetChapterLeadById data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { ChapterLead, Chapter, User } = require('../../../shared/models');

/**
 * GetChapterLeadById operation
 * @param {Object} data - GetChapterLeadById data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Chapter Lead ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getChapterLeadById = async ({ requestId, id }) => {
  console.log(`[${requestId}] GetChapterLeadById attempt: ${id}`);
  
  try {
    const chapterLead = await ChapterLead.findByPk(id, {
      include: [
        {
          model: Chapter,
          as: 'chapter',
          attributes: ['id', 'name', 'city']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar']
        }
      ]
    });

    if (!chapterLead) {
      throw new Error(JSON.stringify(constants.getChapterLeadById.errorMessages.GETE0003));
    }
    
    console.log(`[${requestId}] GetChapterLeadById successful`);
    return chapterLead;
  } catch (error) {
    console.error(`[${requestId}] GetChapterLeadById failed:`, error.message);
    throw error;
  }
};

module.exports = getChapterLeadById;
