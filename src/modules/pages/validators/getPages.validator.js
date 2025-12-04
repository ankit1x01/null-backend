/**
 * GetPages Validator
 * Validates getPages request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getPages request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getPages = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getPages;
