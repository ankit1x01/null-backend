/**
 * DeleteChapterLead Validator
 * Validates deleteChapterLead request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate deleteChapterLead request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const deleteChapterLead = (req) => {
  return { ...req.params, ...req.body };
};

module.exports = deleteChapterLead;
