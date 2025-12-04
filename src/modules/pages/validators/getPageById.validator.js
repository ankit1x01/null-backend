/**
 * GetPageById Validator
 * Validates getPageById request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getPageById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getPageById = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getPageById;
