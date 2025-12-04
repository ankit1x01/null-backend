const express = require('express');
const cors = require('cors');
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
app.use('/api/users', modules.users);
app.use('/api/auth', modules.auth);
app.use('/api/stats', modules.stats);

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

startServer();
