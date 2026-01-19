/**
 * CreatePage Validator
 * Validates createPage request data
 */
const constants = require('../constants');

/**
 * Validate createPage request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const createPage = (req) => {
  const { name, description, navigation_name, title, content, published } = req.body;

  // Validate required fields
  if (!name || name.trim() === '') {
    throw new Error(JSON.stringify(constants.createPage.errorMessages.CREAE0001));
  }

  if (!description || description.trim() === '') {
    throw new Error(JSON.stringify(constants.createPage.errorMessages.CREAE0001));
  }

  if (!navigation_name || navigation_name.trim() === '') {
    throw new Error(JSON.stringify(constants.createPage.errorMessages.CREAE0001));
  }

  if (!title || title.trim() === '') {
    throw new Error(JSON.stringify(constants.createPage.errorMessages.CREAE0001));
  }

  if (!content || content.trim() === '') {
    throw new Error(JSON.stringify(constants.createPage.errorMessages.CREAE0001));
  }

  // Validate optional boolean field
  if (published !== undefined && typeof published !== 'boolean') {
    throw new Error(JSON.stringify(constants.createPage.errorMessages.CREAE0002));
  }

  return req.body;
};

module.exports = createPage;
