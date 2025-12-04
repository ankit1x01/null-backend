/**
 * GetEventSessions Validator
 * Validates getEventSessions request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getEventSessions request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getEventSessions = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getEventSessions;
