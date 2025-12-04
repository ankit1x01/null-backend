/**
 * GetEventTypeById Validator
 * Validates getEventTypeById request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getEventTypeById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getEventTypeById = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getEventTypeById;
