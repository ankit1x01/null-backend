/**
 * EventRegistrations Services
 * Export all event-registrations services
 */
const createEventRegistration = require('./createEventRegistration.service');
const getEventRegistrations = require('./getEventRegistrations.service');
const getEventRegistrationById = require('./getEventRegistrationById.service');
const updateEventRegistration = require('./updateEventRegistration.service');
const deleteEventRegistration = require('./deleteEventRegistration.service');

module.exports = {
  createEventRegistration,
  getEventRegistrations,
  getEventRegistrationById,
  updateEventRegistration,
  deleteEventRegistration,
};
