/**
 * EventTypes Services
 * Export all event-types services
 */
const createEventType = require('./createEventType.service');
const getEventTypes = require('./getEventTypes.service');
const getEventTypeById = require('./getEventTypeById.service');
const updateEventType = require('./updateEventType.service');
const deleteEventType = require('./deleteEventType.service');

module.exports = {
  createEventType,
  getEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType,
};
