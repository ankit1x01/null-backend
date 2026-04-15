const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const modules = require('./modules');
const shared = require('./shared');
const helmet = require("helmet");
const { getSwaggerMiddleware } = require('./swagger');

// Import middlewares and database
const { response, decrypt, encrypt, rateLimiter } = shared.middlewares;
const { testConnection } = shared.database;

// Middleware setup
app.use(cors());

// enable helmet
app.use(helmet());

app.use(helmet.xssFilter());

// Apply rate limiting
app.use(rateLimiter);

// Basic body parsing middleware
app.use(express.json({
  verify: (req, res, buf) => {
    // Store raw body for potential crypto operations
    req.rawBody = buf;
  }
}));

app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
// This allows accessing uploaded files via /uploads/...
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
app.use('/uploads', express.static(path.resolve(UPLOAD_DIR)));

// Serve static test pages (development only)
app.use('/public', express.static(path.resolve('./public')));

// Setup Swagger documentation (before decrypt middleware to avoid issues)
console.log('🚀 Setting up Swagger documentation at /api-docs');
const swaggerMiddleware = getSwaggerMiddleware();

// Add JSON endpoint for dynamic spec refresh
app.get('/api-docs/swagger.json', (req, res) => {
  const { generateSwaggerSpec } = require('./swagger');
  const spec = generateSwaggerSpec();
  res.json(spec);
});

app.use('/api-docs', swaggerMiddleware.serve, swaggerMiddleware.setup);

// Decrypt incoming requests
app.use(decrypt);

// Setup routes
app.use('/api/page-permissions', modules.pagePermissions);
app.use('/api/event-session-comments', modules.eventSessionComments);
app.use('/api/chapter-leads', modules.chapterLeads);
app.use('/api/pages', modules.pages);
app.use('/api/event-types', modules.eventTypes);
app.use('/api/event-registrations', modules.eventRegistrations);
app.use('/api/event-sessions', modules.eventSessions);
app.use('/api/chapters', modules.chapters);
app.use('/api/events', modules.events);
app.use('/api/users', modules.publicUsers);
app.use('/api/users', modules.users);
app.use('/api/auth', modules.auth);
app.use('/api/stats', modules.stats);
app.use('/api/venues', modules.venues);
app.use('/api/user-achievements', modules.userAchievements);
app.use('/api/integrations', modules.integrations);
app.use('/api/session-proposals', modules.sessionProposals);
app.use('/api/session-requests', modules.sessionRequests);
app.use('/api/event-mailer-tasks', modules.eventMailerTasks);
app.use('/api/event-notifications', modules.eventNotifications);
app.use('/api/jobs', modules.jobs);
app.use('/api/event-likes', modules.eventLikes);
app.use('/api/admin-users', modules.adminUsers);
app.use('/api/oauth', modules.oauth);
app.use('/api/leads-portal', modules.leadsPortal);
app.use('/api/twitter', modules.twitter);
app.use('/api/auth-profiles', modules.userAuthProfiles);
app.use('/api/api-tokens', modules.userApiTokens);
app.use('/api/calendar', modules.calendar);
app.use('/api/mass-email', modules.massEmail);
app.use('/api/slack', modules.slack);
app.use('/api/uploads', modules.uploads);

// Legacy Slackbot API route for backwards compatibility
app.use('/api/slackbot', modules.slack);

// Catch-all 404 handler for unmatched routes — must return JSON, not HTML
app.use((req, res, next) => {
  next(new Error(JSON.stringify({ code: 'ERR0404', statusCode: 404, message: 'Route not found' })));
});

// Global response middleware - must be after all routes
app.use(response);

// Apply encryption middleware after response formatting
// This ensures all responses are encrypted including those from response middleware
app.use(encrypt);

// Error handling middleware - fallback for unhandled errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  if (!res.headersSent) {
    // Use status 500 for server errors but still allow encryption middleware to process
    res.status(499).json({
      code: 'ERR0000',
      message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message || 'Internal server error'
    });
  }
});

const PORT = process.env.PORT || 3001;

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};


if (require.main === module) {
  startServer();
}

module.exports = app;
