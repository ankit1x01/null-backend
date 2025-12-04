/**
 * UpdateChapterLead Service
 * Handles updateChapterLead business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * UpdateChapterLead operation
 * @param {Object} data - UpdateChapterLead data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { ChapterLead } = require('../../../shared/models');

/**
 * UpdateChapterLead operation
 * @param {Object} data - UpdateChapterLead data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Chapter Lead ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updateChapterLead = async ({ requestId, id, ...data }) => {
  console.log(`[${requestId}] UpdateChapterLead attempt: ${id}`);
  
  try {
    const chapterLead = await ChapterLead.findByPk(id);
    
    if (!chapterLead) {
      throw new Error(JSON.stringify(constants.updateChapterLead.errorMessages.UPDE0003));
    }

    await chapterLead.update(data);
    
    console.log(`[${requestId}] UpdateChapterLead successful`);
    return chapterLead;
  } catch (error) {
    console.error(`[${requestId}] UpdateChapterLead failed:`, error.message);
    throw error;
  }
};

module.exports = updateChapterLead;
