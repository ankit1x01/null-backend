/**
 * EventRegistrations Validators
 * Export all event-registrations validators
 */
const createEventRegistration = require('./createEventRegistration.validator');
const getEventRegistrations = require('./getEventRegistrations.validator');
const getEventRegistrationById = require('./getEventRegistrationById.validator');
const updateEventRegistration = require('./updateEventRegistration.validator');
const deleteEventRegistration = require('./deleteEventRegistration.validator');

module.exports = {
  createEventRegistration,
  getEventRegistrations,
  getEventRegistrationById,
  updateEventRegistration,
  deleteEventRegistration,
};
