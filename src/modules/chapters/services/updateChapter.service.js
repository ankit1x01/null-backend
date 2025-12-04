/**
 * UpdateChapter Service
 * Handles updateChapter business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { Chapter } = require('../../../shared/models');

/**
 * UpdateChapter operation
 * @param {Object} data - UpdateChapter data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Chapter ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updateChapter = async ({ requestId, id, ...data }) => {
  console.log(`[${requestId}] UpdateChapter attempt: ${id}`);
  
  try {
    const chapter = await Chapter.findByPk(id);
    
    if (!chapter) {
      throw new Error(JSON.stringify({
        code: 'CHPT0003',
        statusCode: 404,
        message: 'Chapter not found'
      }));
    }

    await chapter.update(data);
    
    console.log(`[${requestId}] UpdateChapter successful`);
    return chapter;
  } catch (error) {
    console.error(`[${requestId}] UpdateChapter failed:`, error.message);
    throw error;
  }
};

module.exports = updateChapter;
