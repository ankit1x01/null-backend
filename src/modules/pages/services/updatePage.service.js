/**
 * UpdatePage Service
 * Handles updatePage business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * UpdatePage operation
 * @param {Object} data - UpdatePage data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { Page } = require('../../../shared/models');
const slugify = require('slugify');

/**
 * UpdatePage operation
 * @param {Object} data - UpdatePage data
 * @param {string} data.requestId - Request ID for tracking
 * @param {string} data.id - Page ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updatePage = async ({ requestId, id, ...data }) => {
  console.log(`[${requestId}] UpdatePage attempt: ${id}`);
  
  try {
    const page = await Page.findByPk(id);
    
    if (!page) {
      throw new Error(JSON.stringify(constants.updatePage.errorMessages.UPDE0003));
    }

    if (data.title && !data.slug) {
      data.slug = slugify(data.title, { lower: true, strict: true });
    }

    await page.update(data);
    
    console.log(`[${requestId}] UpdatePage successful`);
    return page;
  } catch (error) {
    console.error(`[${requestId}] UpdatePage failed:`, error.message);
    throw error;
  }
};

module.exports = updatePage;
