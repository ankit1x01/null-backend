/**
 * UpdateEventType Validator
 * Validates updateEventType request data
 */
const constants = require('../constants');

/**
 * Validate updateEventType request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const updateEventType = (req) => {
  const {
    name,
    description,
    max_participant,
    public: isPublic,
    registration_required,
    invitation_required
  } = req.body;

  // At least one field must be provided for update
  const hasFields = name || description || max_participant !== undefined ||
                    isPublic !== undefined || registration_required !== undefined ||
                    invitation_required !== undefined;

  if (!hasFields) {
    throw new Error(JSON.stringify(constants.updateEventType.errorMessages.UPDAE0001));
  }

  // Validate name if provided
  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    throw new Error(JSON.stringify(constants.updateEventType.errorMessages.UPDAE0002));
  }

  // Validate max_participant if provided
  if (max_participant !== undefined) {
    if (!Number.isInteger(Number(max_participant)) || Number(max_participant) <= 0) {
      throw new Error(JSON.stringify(constants.updateEventType.errorMessages.UPDAE0002));
    }
  }

  // Validate boolean fields if provided
  if (isPublic !== undefined && typeof isPublic !== 'boolean') {
    throw new Error(JSON.stringify(constants.updateEventType.errorMessages.UPDAE0002));
  }

  if (registration_required !== undefined && typeof registration_required !== 'boolean') {
    throw new Error(JSON.stringify(constants.updateEventType.errorMessages.UPDAE0002));
  }

  if (invitation_required !== undefined && typeof invitation_required !== 'boolean') {
    throw new Error(JSON.stringify(constants.updateEventType.errorMessages.UPDAE0002));
  }

  return {
    ...req.body,
    id: req.params.id
  };
};

module.exports = updateEventType;
