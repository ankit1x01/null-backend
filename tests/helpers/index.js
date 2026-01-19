/**
 * Test Helpers
 * Common utilities and mock data for testing
 */

const jwt = require('jsonwebtoken');

/**
 * Generate a valid JWT token for testing
 * @param {Object} payload - Token payload
 * @returns {string} JWT token
 */
const generateTestToken = (payload = {}) => {
  const defaultPayload = {
    id: 1,
    email: 'test@example.com',
    admin: false,
    ...payload
  };
  return jwt.sign(defaultPayload, process.env.JWT_SECRET || 'test-jwt-secret-key-12345', {
    expiresIn: '1h'
  });
};

/**
 * Generate admin JWT token
 * @returns {string} Admin JWT token
 */
const generateAdminToken = () => {
  return generateTestToken({
    id: 1,
    email: 'admin@example.com',
    admin: true
  });
};

/**
 * Generate regular user JWT token
 * @param {number} userId - User ID
 * @returns {string} User JWT token
 */
const generateUserToken = (userId = 2) => {
  return generateTestToken({
    id: userId,
    email: `user${userId}@example.com`,
    admin: false
  });
};

/**
 * Mock user data
 */
const mockUsers = {
  admin: {
    id: 1,
    email: 'admin@example.com',
    name: 'Admin User',
    admin: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  regular: {
    id: 2,
    email: 'user@example.com',
    name: 'Regular User',
    admin: false,
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock chapter data
 */
const mockChapters = {
  chapter1: {
    id: 1,
    name: 'Test Chapter',
    city: 'Test City',
    country: 'Test Country',
    slug: 'test-chapter',
    active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock event data
 */
const mockEvents = {
  event1: {
    id: 1,
    name: 'Test Event',
    description: 'Test Description',
    chapter_id: 1,
    venue_id: 1,
    event_type_id: 1,
    start_time: new Date(),
    end_time: new Date(Date.now() + 3600000),
    registration_start_time: new Date(Date.now() - 86400000),
    registration_end_time: new Date(Date.now() + 86400000),
    max_registrations: 100,
    published: true,
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock venue data
 */
const mockVenues = {
  venue1: {
    id: 1,
    name: 'Test Venue',
    address: '123 Test Street',
    city: 'Test City',
    country: 'Test Country',
    capacity: 100,
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock event session data
 */
const mockEventSessions = {
  session1: {
    id: 1,
    event_id: 1,
    user_id: 2,
    title: 'Test Session',
    description: 'Test session description',
    start_time: new Date(),
    end_time: new Date(Date.now() + 1800000),
    status: 'confirmed',
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock event registration data
 */
const mockEventRegistrations = {
  registration1: {
    id: 1,
    event_id: 1,
    user_id: 2,
    status: 'confirmed',
    attended: false,
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock event type data
 */
const mockEventTypes = {
  type1: {
    id: 1,
    name: 'Meetup',
    description: 'Regular meetup event',
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock chapter lead data
 */
const mockChapterLeads = {
  lead1: {
    id: 1,
    user_id: 1,
    chapter_id: 1,
    role: 'lead',
    active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock job data
 */
const mockJobs = {
  job1: {
    id: 1,
    type: 'email',
    status: 'pending',
    data: { subject: 'Test', recipients: [] },
    progress: 0,
    created_at: new Date(),
    updated_at: new Date()
  }
};

/**
 * Mock API response structure
 */
const createMockResponse = (code, message, result = null, statusCode = 200) => ({
  code,
  statusCode,
  message,
  result
});

/**
 * Create success response
 */
const successResponse = (result, message = 'Success') => createMockResponse('SUCCESS0001', message, result, 200);

/**
 * Create error response
 */
const errorResponse = (message = 'Error', code = 'ERR0001', statusCode = 400) => createMockResponse(code, message, null, statusCode);

module.exports = {
  generateTestToken,
  generateAdminToken,
  generateUserToken,
  mockUsers,
  mockChapters,
  mockEvents,
  mockVenues,
  mockEventSessions,
  mockEventRegistrations,
  mockEventTypes,
  mockChapterLeads,
  mockJobs,
  createMockResponse,
  successResponse,
  errorResponse
};
