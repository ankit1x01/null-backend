/**
 * EventSessions Services
 * Export all event-sessions services
 */
const createEventSession = require('./createEventSession.service');
const getEventSessions = require('./getEventSessions.service');
const getEventSessionById = require('./getEventSessionById.service');
const updateEventSession = require('./updateEventSession.service');
const deleteEventSession = require('./deleteEventSession.service');
const getMySessions = require('./getMySessions.service');
const dislikeSession = require('./dislikeSession.service');

module.exports = {
  createEventSession,
  getEventSessions,
  getEventSessionById,
  updateEventSession,
  deleteEventSession,
  getMySessions,
  dislikeSession
};
