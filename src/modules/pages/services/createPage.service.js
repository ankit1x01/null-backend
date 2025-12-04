/**
 * CreatePage Service
 * Handles createPage business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * CreatePage operation
 * @param {Object} data - CreatePage data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const { Page } = require('../../../shared/models');
const slugify = require('slugify');

/**
 * CreatePage operation
 * @param {Object} data - CreatePage data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createPage = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreatePage attempt`);
  
  try {
    if (data.title && !data.slug) {
      data.slug = slugify(data.title, { lower: true, strict: true });
    }

    const page = await Page.create(data);
    
    console.log(`[${requestId}] CreatePage successful: Created page ${page.id}`);
    return page;
  } catch (error) {
    console.error(`[${requestId}] CreatePage failed:`, error.message);
    throw new Error(JSON.stringify(constants.createPage.errorMessages.CREAE0003));
  }
};

module.exports = createPage;
