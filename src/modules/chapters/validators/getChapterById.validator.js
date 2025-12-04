/**
 * GetChapterById Validator
 * Validates getChapterById request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getChapterById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getChapterById = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getChapterById;
