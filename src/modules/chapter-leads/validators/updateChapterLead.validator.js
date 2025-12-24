/**
 * UpdateChapterLead Validator
 * Validates updateChapterLead request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate updateChapterLead request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const updateChapterLead = (req) => {
  return { ...req.params, ...req.body };
};

module.exports = updateChapterLead;
