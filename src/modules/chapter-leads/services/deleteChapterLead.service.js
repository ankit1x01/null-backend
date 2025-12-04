/**
 * DeleteChapterLead Service
 * Handles deleteChapterLead business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * DeleteChapterLead operation
 * @param {Object} data - DeleteChapterLead data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { ChapterLead } = require('../../../shared/models');

/**
 * DeleteChapterLead operation
 * @param {Object} data - DeleteChapterLead data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Chapter Lead ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deleteChapterLead = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeleteChapterLead attempt: ${id}`);
  
  try {
    const chapterLead = await ChapterLead.findByPk(id);
    
    if (!chapterLead) {
      throw new Error(JSON.stringify(constants.deleteChapterLead.errorMessages.DELE0003));
    }

    await chapterLead.destroy();
    
    console.log(`[${requestId}] DeleteChapterLead successful`);
    return { success: true, id };
  } catch (error) {
    console.error(`[${requestId}] DeleteChapterLead failed:`, error.message);
    throw error;
  }
};

module.exports = deleteChapterLead;
