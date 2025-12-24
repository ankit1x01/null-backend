const auth = require('./auth/routes');
const users = require('./users/routes');
const events = require('./events/routes');
const chapters = require('./chapters/routes');
const eventSessions = require('./event-sessions/routes');
const eventRegistrations = require('./event-registrations/routes');
const eventTypes = require('./event-types/routes');
const pages = require('./pages/routes');
const chapterLeads = require('./chapter-leads/routes');
const eventSessionComments = require('./event-session-comments/routes');
const pagePermissions = require('./page-permissions/routes');

module.exports = {
  auth,
  users,
  events,
  chapters,
  eventSessions,
  eventRegistrations,
  eventTypes,
  pages,
  chapterLeads,
  eventSessionComments,
  pagePermissions,
  stats: require('./stats/routes'),
  venues: require('./venues/routes'),
  userAchievements: require('./user-achievements/routes'),
  publicUsers: require('./users/public_routes'),
};
