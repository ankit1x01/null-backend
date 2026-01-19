/**
 * Test Fixtures Index
 * Central export for all mock data
 */

const users = require('./users.fixture');
const chapters = require('./chapters.fixture');
const events = require('./events.fixture');
const venues = require('./venues.fixture');
const sessions = require('./sessions.fixture');
const registrations = require('./registrations.fixture');
const auth = require('./auth.fixture');

module.exports = {
  users,
  chapters,
  events,
  venues,
  sessions,
  registrations,
  auth
};
