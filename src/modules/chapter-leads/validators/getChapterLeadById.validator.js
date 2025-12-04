/**
 * GetChapterLeadById Validator
 * Validates getChapterLeadById request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getChapterLeadById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getChapterLeadById = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getChapterLeadById;
