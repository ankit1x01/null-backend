/**
 * EventSessionComments Validators
 * Export all event-session-comments validators
 */
const createEventSessionComment = require('./createEventSessionComment.validator');
const updateEventSessionComment = require('./updateEventSessionComment.validator');
const deleteEventSessionComment = require('./deleteEventSessionComment.validator');

module.exports = {
  createEventSessionComment,
  updateEventSessionComment,
  deleteEventSessionComment,
};
