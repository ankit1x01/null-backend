const getEvents = require('./getEvents.service');
const getEventById = require('./getEventById.service');
const createEvent = require('./createEvent.service');
const updateEvent = require('./updateEvent.service');
const deleteEvent = require('./deleteEvent.service');

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
