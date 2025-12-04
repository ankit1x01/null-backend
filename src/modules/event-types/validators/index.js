/**
 * EventTypes Validators
 * Export all event-types validators
 */
const createEventType = require('./createEventType.validator');
const getEventTypes = require('./getEventTypes.validator');
const getEventTypeById = require('./getEventTypeById.validator');
const updateEventType = require('./updateEventType.validator');
const deleteEventType = require('./deleteEventType.validator');

module.exports = {
  createEventType,
  getEventTypes,
  getEventTypeById,
  updateEventType,
  deleteEventType,
};
