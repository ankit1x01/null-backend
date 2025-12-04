/**
 * CreateChapterLead Service
 * Handles createChapterLead business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * CreateChapterLead operation
 * @param {Object} data - CreateChapterLead data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { ChapterLead } = require('../../../shared/models');

/**
 * CreateChapterLead operation
 * @param {Object} data - CreateChapterLead data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createChapterLead = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreateChapterLead attempt`);
  
  try {
    const chapterLead = await ChapterLead.create(data);
    
    console.log(`[${requestId}] CreateChapterLead successful: Created lead ${chapterLead.id}`);
    return chapterLead;
  } catch (error) {
    console.error(`[${requestId}] CreateChapterLead failed:`, error.message);
    throw new Error(JSON.stringify(constants.createChapterLead.errorMessages.CREAE0003));
  }
};

module.exports = createChapterLead;
