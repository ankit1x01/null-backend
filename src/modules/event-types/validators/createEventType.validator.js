/**
 * CreateEventType Validator
 * Validates createEventType request data
 */
const constants = require('../constants');

/**
 * Validate createEventType request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const createEventType = (req) => {
  const {
    name,
    description,
    max_participant,
    public: isPublic,
    registration_required,
    invitation_required
  } = req.body;

  // Validate required field
  if (!name || name.trim() === '') {
    throw new Error(JSON.stringify(constants.createEventType.errorMessages.CREAE0001));
  }

  // Validate max_participant if provided
  if (max_participant !== undefined) {
    if (!Number.isInteger(Number(max_participant)) || Number(max_participant) <= 0) {
      throw new Error(JSON.stringify(constants.createEventType.errorMessages.CREAE0002));
    }
  }

  // Validate boolean fields if provided
  if (isPublic !== undefined && typeof isPublic !== 'boolean') {
    throw new Error(JSON.stringify(constants.createEventType.errorMessages.CREAE0002));
  }

  if (registration_required !== undefined && typeof registration_required !== 'boolean') {
    throw new Error(JSON.stringify(constants.createEventType.errorMessages.CREAE0002));
  }

  if (invitation_required !== undefined && typeof invitation_required !== 'boolean') {
    throw new Error(JSON.stringify(constants.createEventType.errorMessages.CREAE0002));
  }

  return req.body;
};

module.exports = createEventType;
