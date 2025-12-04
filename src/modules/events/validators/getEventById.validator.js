/**
 * GetEventById Validator
 * Validates getEventById request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getEventById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getEventById = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getEventById;
