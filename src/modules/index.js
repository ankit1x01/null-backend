const auth = require('./auth/routes');
const users = require('./users/routes');
const events = require('./events/routes');
const chapters = require('./chapters/routes');
const eventSessions = require('./event-sessions/routes');
const eventRegistrations = require('./event-registrations/routes');
const eventTypes = require('./event-types/routes');
const integrations = require('./integrations/routes');
const pages = require('./pages/routes');
const chapterLeads = require('./chapter-leads/routes');
const eventSessionComments = require('./event-session-comments/routes');
const pagePermissions = require('./page-permissions/routes');
const sessionProposals = require('./session-proposals/routes');
const sessionRequests = require('./session-requests/routes');
const eventMailerTasks = require('./event-mailer-tasks/routes');
const eventNotifications = require('./event-notifications/routes');
const jobs = require('./jobs/routes');
const eventLikes = require('./event-likes/routes');
const adminUsers = require('./admin-users/routes');
const oauth = require('./oauth/routes');
const leadsPortal = require('./leads-portal/routes');
const twitter = require('./twitter/routes');
const userAuthProfiles = require('./user-auth-profiles/routes');
const userApiTokens = require('./user-api-tokens/routes');
const calendar = require('./calendar/routes');
const massEmail = require('./mass-email/routes');
const slack = require('./slack/routes');
const uploads = require('./uploads/routes');

module.exports = {
  auth,
  users,
  events,
  chapters,
  eventSessions,
  eventRegistrations,
  eventTypes,
  integrations,
  pages,
  chapterLeads,
  eventSessionComments,
  pagePermissions,
  sessionProposals,
  sessionRequests,
  stats: require('./stats/routes'),
  venues: require('./venues/routes'),
  userAchievements: require('./user-achievements/routes'),
  publicUsers: require('./users/public_routes'),
  eventMailerTasks,
  eventNotifications,
  jobs,
  eventLikes,
  adminUsers,
  oauth,
  leadsPortal,
  twitter,
  userAuthProfiles,
  userApiTokens,
  calendar,
  massEmail,
  slack,
  uploads,
};
