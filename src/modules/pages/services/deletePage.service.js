/**
 * DeletePage Service
 * Handles deletePage business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * DeletePage operation
 * @param {Object} data - DeletePage data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { Page } = require('../../../shared/models');

/**
 * DeletePage operation
 * @param {Object} data - DeletePage data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Page ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deletePage = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeletePage attempt: ${id}`);
  
  try {
    const page = await Page.findByPk(id);
    
    if (!page) {
      throw new Error(JSON.stringify(constants.deletePage.errorMessages.DELE0003));
    }

    await page.destroy();
    
    console.log(`[${requestId}] DeletePage successful`);
    return { success: true, id };
  } catch (error) {
    console.error(`[${requestId}] DeletePage failed:`, error.message);
    throw error;
  }
};

module.exports = deletePage;
