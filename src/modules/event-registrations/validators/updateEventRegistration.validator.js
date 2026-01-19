/**
 * UpdateEventRegistration Validator
 * Validates updateEventRegistration request data
 */
const constants = require('../constants');

/**
 * Validate updateEventRegistration request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const updateEventRegistration = (req) => {
  const { accepted, visible, state } = req.body;

  // At least one field must be provided for update
  if (accepted === undefined && visible === undefined && state === undefined) {
    throw new Error(JSON.stringify(constants.updateEventRegistration.errorMessages.UPDAE0001));
  }

  // Validate optional boolean fields
  if (accepted !== undefined && typeof accepted !== 'boolean') {
    throw new Error(JSON.stringify(constants.updateEventRegistration.errorMessages.UPDAE0002));
  }

  if (visible !== undefined && typeof visible !== 'boolean') {
    throw new Error(JSON.stringify(constants.updateEventRegistration.errorMessages.UPDAE0002));
  }

  // Validate state enum if provided
  const validStates = ['Provisional', 'Confirmed', 'Not Attending', 'Absent'];
  if (state !== undefined && !validStates.includes(state)) {
    throw new Error(JSON.stringify(constants.updateEventRegistration.errorMessages.UPDAE0002));
  }

  return req.body;
};

module.exports = updateEventRegistration;
