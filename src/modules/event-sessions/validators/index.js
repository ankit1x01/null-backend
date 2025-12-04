/**
 * EventSessions Validators
 * Export all event-sessions validators
 */
const createEventSession = require('./createEventSession.validator');
const getEventSessions = require('./getEventSessions.validator');
const getEventSessionById = require('./getEventSessionById.validator');
const updateEventSession = require('./updateEventSession.validator');
const deleteEventSession = require('./deleteEventSession.validator');

module.exports = {
  createEventSession,
  getEventSessions,
  getEventSessionById,
  updateEventSession,
  deleteEventSession,
};
