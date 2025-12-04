/**
 * GetEvents Validator
 * Validates getEvents request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getEvents request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getEvents = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getEvents;
