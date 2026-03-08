/**
 * UpdateEventSessionComment Validator
 * Validates updateEventSessionComment request data
 */
const constants = require('../constants');

/**
 * Validate updateEventSessionComment request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const updateEventSessionComment = (req) => {
  const { comment_body, comment } = req.body;

  // Support both comment_body (model field) and comment (API field)
  const commentText = comment_body || comment;

  // At least comment field must be provided for update
  if (!commentText) {
    throw new Error(JSON.stringify(constants.updateEventSessionComment.errorMessages.UPDAE0001));
  }

  // Validate comment text
  if (typeof commentText !== 'string' || commentText.trim() === '') {
    throw new Error(JSON.stringify(constants.updateEventSessionComment.errorMessages.UPDAE0002));
  }

  return {
    id: Number(req.params.id),
    comment: commentText
  };
};

module.exports = updateEventSessionComment;
