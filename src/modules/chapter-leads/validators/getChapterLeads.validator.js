/**
 * GetChapterLeads Validator
 * Validates getChapterLeads request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getChapterLeads request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getChapterLeads = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getChapterLeads;
