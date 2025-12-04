/**
 * GetEventRegistrations Validator
 * Validates getEventRegistrations request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getEventRegistrations request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getEventRegistrations = (req) => {
  return { ...req.query, ...req.body };
};

module.exports = getEventRegistrations;
