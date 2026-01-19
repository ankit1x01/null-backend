/**
 * CreateEventSession Validator
 * Validates createEventSession request data
 */
const constants = require('../constants');

/**
 * Validate createEventSession request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const createEventSession = (req) => {
  const {
    event_id,
    user_id,
    name,
    description,
    session_type,
    start_time,
    end_time,
    need_projector,
    need_microphone,
    need_whiteboard
  } = req.body;

  // Validate required fields
  if (!event_id) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0001));
  }

  if (!user_id) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0001));
  }

  if (!name || name.trim() === '') {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0001));
  }

  if (!description || description.trim() === '') {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0001));
  }

  if (!start_time) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0001));
  }

  if (!end_time) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0001));
  }

  // Validate field types
  if (!Number.isInteger(Number(event_id))) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0002));
  }

  if (!Number.isInteger(Number(user_id))) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0002));
  }

  // Validate time fields
  const startDate = new Date(start_time);
  const endDate = new Date(end_time);

  if (isNaN(startDate.getTime())) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0002));
  }

  if (isNaN(endDate.getTime())) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0002));
  }

  // Validate end time is after start time
  if (endDate <= startDate) {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0002));
  }

  // Validate optional boolean fields
  if (need_projector !== undefined && typeof need_projector !== 'boolean') {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0002));
  }

  if (need_microphone !== undefined && typeof need_microphone !== 'boolean') {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0002));
  }

  if (need_whiteboard !== undefined && typeof need_whiteboard !== 'boolean') {
    throw new Error(JSON.stringify(constants.createEventSession.errorMessages.CREAE0002));
  }

  return req.body;
};

module.exports = createEventSession;
