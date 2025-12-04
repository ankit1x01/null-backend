/**
 * CreateChapter Service
 * Handles createChapter business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { Chapter } = require('../../../shared/models');

/**
 * CreateChapter operation
 * @param {Object} data - CreateChapter data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createChapter = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreateChapter attempt`);
  
  try {
    const chapter = await Chapter.create(data);
    
    console.log(`[${requestId}] CreateChapter successful: Created chapter ${chapter.id}`);
    return chapter;
  } catch (error) {
    console.error(`[${requestId}] CreateChapter failed:`, error.message);
    throw new Error(JSON.stringify(sharedConstants.serverError));
  }
};

module.exports = createChapter;
