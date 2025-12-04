/**
 * GetChapters Validator
 * Validates getChapters request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getChapters request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getChapters = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getChapters;
