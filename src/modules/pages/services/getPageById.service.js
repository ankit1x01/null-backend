/**
 * GetPageById Service
 * Handles getPageById business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * GetPageById operation
 * @param {Object} data - GetPageById data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { Page } = require('../../../shared/models');

/**
 * GetPageById operation
 * @param {Object} data - GetPageById data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Page ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getPageById = async ({ requestId, id }) => {
  console.log(`[${requestId}] GetPageById attempt: ${id}`);
  
  try {
    const page = await Page.findByPk(id);

    if (!page) {
      throw new Error(JSON.stringify(constants.getPageById.errorMessages.GETE0003));
    }
    
    console.log(`[${requestId}] GetPageById successful`);
    return page;
  } catch (error) {
    console.error(`[${requestId}] GetPageById failed:`, error.message);
    throw error;
  }
};

module.exports = getPageById;
