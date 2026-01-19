/**
 * UpdatePage Validator
 * Validates updatePage request data
 */
const constants = require('../constants');

/**
 * Validate updatePage request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const updatePage = (req) => {
  const { name, description, navigation_name, title, content, published } = req.body;

  // At least one field must be provided for update
  const hasFields = name || description || navigation_name || title || content || published !== undefined;

  if (!hasFields) {
    throw new Error(JSON.stringify(constants.updatePage.errorMessages.UPDAE0001));
  }

  // Validate fields if provided
  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    throw new Error(JSON.stringify(constants.updatePage.errorMessages.UPDAE0002));
  }

  if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
    throw new Error(JSON.stringify(constants.updatePage.errorMessages.UPDAE0002));
  }

  if (navigation_name !== undefined && (typeof navigation_name !== 'string' || navigation_name.trim() === '')) {
    throw new Error(JSON.stringify(constants.updatePage.errorMessages.UPDAE0002));
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    throw new Error(JSON.stringify(constants.updatePage.errorMessages.UPDAE0002));
  }

  if (content !== undefined && (typeof content !== 'string' || content.trim() === '')) {
    throw new Error(JSON.stringify(constants.updatePage.errorMessages.UPDAE0002));
  }

  if (published !== undefined && typeof published !== 'boolean') {
    throw new Error(JSON.stringify(constants.updatePage.errorMessages.UPDAE0002));
  }

  return req.body;
};

module.exports = updatePage;
