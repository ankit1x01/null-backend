/**
 * Events Validators
 * Export all events validators
 */
const getEvents = require('./getEvents.validator');
const getEventById = require('./getEventById.validator');

module.exports = {
  getEvents,
  getEventById,
};
