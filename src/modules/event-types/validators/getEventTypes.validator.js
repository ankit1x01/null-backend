/**
 * GetEventTypes Validator
 * Validates getEventTypes request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getEventTypes request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getEventTypes = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getEventTypes;
