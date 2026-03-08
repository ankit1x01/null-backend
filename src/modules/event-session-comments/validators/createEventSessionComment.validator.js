/**
 * CreateEventSessionComment Validator
 * Validates createEventSessionComment request data
 */
const constants = require('../constants');

/**
 * Validate createEventSessionComment request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const createEventSessionComment = (req) => {
  const { event_session_id, user_id, comment_body, comment } = req.body;

  // Support both comment_body (model field) and comment (API field)
  const commentText = comment_body || comment;

  // Validate required fields
  if (!event_session_id) {
    throw new Error(JSON.stringify(constants.createEventSessionComment.errorMessages.CREAE0001));
  }

  if (!user_id) {
    throw new Error(JSON.stringify(constants.createEventSessionComment.errorMessages.CREAE0001));
  }

  if (!commentText || commentText.trim() === '') {
    throw new Error(JSON.stringify(constants.createEventSessionComment.errorMessages.CREAE0001));
  }

  // Validate field types
  if (!Number.isInteger(Number(event_session_id))) {
    throw new Error(JSON.stringify(constants.createEventSessionComment.errorMessages.CREAE0002));
  }

  if (!Number.isInteger(Number(user_id))) {
    throw new Error(JSON.stringify(constants.createEventSessionComment.errorMessages.CREAE0002));
  }

  return {
    event_session_id: Number(event_session_id),
    user_id: Number(user_id),
    comment: commentText
  };
};

module.exports = createEventSessionComment;
