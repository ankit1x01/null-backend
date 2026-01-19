/**
 * UpdateEventSession Validator
 * Validates updateEventSession request data
 */
const constants = require('../constants');

/**
 * Validate updateEventSession request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const updateEventSession = (req) => {
  const {
    name,
    description,
    session_type,
    start_time,
    end_time,
    need_projector,
    need_microphone,
    need_whiteboard,
    presentation_url,
    video_url
  } = req.body;

  // At least one field must be provided for update
  const hasFields = name || description || session_type || start_time || end_time ||
                    need_projector !== undefined || need_microphone !== undefined ||
                    need_whiteboard !== undefined || presentation_url || video_url;

  if (!hasFields) {
    throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0001));
  }

  // Validate name if provided
  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0002));
  }

  // Validate description if provided
  if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
    throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0002));
  }

  // Validate time fields if provided
  if (start_time !== undefined) {
    const startDate = new Date(start_time);
    if (isNaN(startDate.getTime())) {
      throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0002));
    }
  }

  if (end_time !== undefined) {
    const endDate = new Date(end_time);
    if (isNaN(endDate.getTime())) {
      throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0002));
    }
  }

  // Validate end time is after start time if both are provided
  if (start_time && end_time) {
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);
    if (endDate <= startDate) {
      throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0002));
    }
  }

  // Validate optional boolean fields
  if (need_projector !== undefined && typeof need_projector !== 'boolean') {
    throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0002));
  }

  if (need_microphone !== undefined && typeof need_microphone !== 'boolean') {
    throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0002));
  }

  if (need_whiteboard !== undefined && typeof need_whiteboard !== 'boolean') {
    throw new Error(JSON.stringify(constants.updateEventSession.errorMessages.UPDAE0002));
  }

  return req.body;
};

module.exports = updateEventSession;
