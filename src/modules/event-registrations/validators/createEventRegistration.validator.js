/**
 * CreateEventRegistration Validator
 * Validates createEventRegistration request data
 */
const constants = require('../constants');

/**
 * Validate createEventRegistration request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const createEventRegistration = (req) => {
  const { event_id, user_id, accepted, visible, state } = req.body;

  // Validate required fields
  if (!event_id) {
    throw new Error(JSON.stringify(constants.createEventRegistration.errorMessages.CREAE0001));
  }

  if (!user_id) {
    throw new Error(JSON.stringify(constants.createEventRegistration.errorMessages.CREAE0001));
  }

  // Validate field types
  if (!Number.isInteger(Number(event_id))) {
    throw new Error(JSON.stringify(constants.createEventRegistration.errorMessages.CREAE0002));
  }

  if (!Number.isInteger(Number(user_id))) {
    throw new Error(JSON.stringify(constants.createEventRegistration.errorMessages.CREAE0002));
  }

  // Validate optional boolean fields
  if (accepted !== undefined && typeof accepted !== 'boolean') {
    throw new Error(JSON.stringify(constants.createEventRegistration.errorMessages.CREAE0002));
  }

  if (visible !== undefined && typeof visible !== 'boolean') {
    throw new Error(JSON.stringify(constants.createEventRegistration.errorMessages.CREAE0002));
  }

  // Validate state enum if provided
  const validStates = ['Provisional', 'Confirmed', 'Not Attending', 'Absent'];
  if (state !== undefined && !validStates.includes(state)) {
    throw new Error(JSON.stringify(constants.createEventRegistration.errorMessages.CREAE0002));
  }

  return req.body;
};

module.exports = createEventRegistration;
