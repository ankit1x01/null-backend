/**
 * DeleteChapter Service
 * Handles deleteChapter business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { Chapter } = require('../../../shared/models');

/**
 * DeleteChapter operation
 * @param {Object} data - DeleteChapter data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Chapter ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deleteChapter = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeleteChapter attempt: ${id}`);
  
  try {
    const chapter = await Chapter.findByPk(id);
    
    if (!chapter) {
      throw new Error(JSON.stringify({
        code: 'CHPT0003',
        statusCode: 404,
        message: 'Chapter not found'
      }));
    }

    await chapter.destroy();
    
    console.log(`[${requestId}] DeleteChapter successful`);
    return { success: true, id };
  } catch (error) {
    console.error(`[${requestId}] DeleteChapter failed:`, error.message);
    throw error;
  }
};

module.exports = deleteChapter;
