/**
 * EventSessionComments Services
 * Export all event-session-comments services
 */
const getEventSessionComments = require('./getEventSessionComments.service');
const getEventSessionCommentById = require('./getEventSessionCommentById.service');
const createEventSessionComment = require('./createEventSessionComment.service');
const updateEventSessionComment = require('./updateEventSessionComment.service');
const deleteEventSessionComment = require('./deleteEventSessionComment.service');

module.exports = {
  getEventSessionComments,
  getEventSessionCommentById,
  createEventSessionComment,
  updateEventSessionComment,
  deleteEventSessionComment,
};
