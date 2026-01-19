/**
 * Test Index File
 * Exports all test configurations and utilities
 */

// Test Utilities
const testUtils = require('./helpers/test-utils');
const helpers = require('./helpers');

// Fixtures
const fixtures = {
  users: require('./fixtures/users.fixture'),
  auth: require('./fixtures/auth.fixture'),
  chapters: require('./fixtures/chapters.fixture'),
  events: require('./fixtures/events.fixture'),
  venues: require('./fixtures/venues.fixture'),
  sessions: require('./fixtures/sessions.fixture'),
  registrations: require('./fixtures/registrations.fixture')
};

// Test Data for Integration Tests
const testData = {
  auth: require('./integration/auth/auth.data'),
  users: require('./integration/users/users.data'),
  chapters: require('./integration/chapters/chapters.data'),
  events: require('./integration/events/events.data'),
  sessions: require('./integration/sessions/sessions.data'),
  registrations: require('./integration/registrations/registrations.data'),
  venues: require('./integration/venues/venues.data')
};

module.exports = {
  ...testUtils,
  ...helpers,
  fixtures,
  testData
};
