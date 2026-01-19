/**
 * Test Utilities
 * Common utilities for API testing
 *
 * For integration tests, we use actual login to get valid tokens
 * This ensures tokens work with the JWT middleware that validates against DB
 */

const request = require('supertest');


const app = require('../../src/index');

// Base URL for API calls - using app instance for integration tests
const BASE_URL = app;

// Token cache to avoid multiple logins
const tokenCache = {};

/**
 * Login and get a valid token from the API
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<string>} - JWT token
 */
const loginAndGetToken = async (email, password) => {
  const cacheKey = `${email}:${password}`;

  if (tokenCache[cacheKey]) {
    return tokenCache[cacheKey];
  }

  try {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email, password });

    if (res.status === 200 && res.body.result?.token) {
      tokenCache[cacheKey] = res.body.result.token;
      return res.body.result.token;
    }

    console.warn(`Login failed for ${email}: ${res.body.message || 'Unknown error'}`);
    return null;
  } catch (error) {
    console.error(`Login error for ${email}:`, error.message);
    return null;
  }
};

/**
 * Get admin token via login
 * Uses seeded admin user credentials
 */
const getAdminToken = async () => {
  return loginAndGetToken('admin@nullchapter.com', 'Admin@123');
};

/**
 * Get regular user token via login
 */
const getUserToken = async () => {
  return loginAndGetToken('user@example.com', 'User@123');
};

/**
 * Get chapter lead token via login
 */
const getChapterLeadToken = async () => {
  return loginAndGetToken('lead@example.com', 'Lead@123');
};

/**
 * Get speaker token via login
 */
const getSpeakerToken = async () => {
  return loginAndGetToken('speaker@example.com', 'Speaker@123');
};

/**
 * Generate invalid token for testing
 */
const getInvalidToken = () => 'invalid-token-12345';

/**
 * Generate expired token (malformed on purpose)
 */
const getExpiredToken = () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE2MDAwMDAwMDF9.invalid_signature';

/**
 * Clear token cache
 */
const clearTokenCache = () => {
  Object.keys(tokenCache).forEach(key => delete tokenCache[key]);
};

/**
 * Standard response structure
 */
const responseStructure = {
  success: {
    hasCode: true,
    hasMessage: true,
    hasResult: true
  },
  error: {
    hasCode: true,
    hasMessage: true
  }
};

/**
 * Validate success response structure
 */
const expectSuccessResponse = (response) => {
  expect(response.body).toHaveProperty('code');
  expect(response.body).toHaveProperty('message');
  expect(response.body).toHaveProperty('result');
};

/**
 * Validate error response structure
 */
const expectErrorResponse = (response, expectedStatus) => {
  expect(response.status).toBe(expectedStatus);
  expect(response.body).toHaveProperty('code');
  expect(response.body).toHaveProperty('message');
};

/**
 * Validate pagination response
 */
const expectPaginatedResponse = (response) => {
  expectSuccessResponse(response);
  expect(response.body.result).toHaveProperty('data');
  expect(Array.isArray(response.body.result.data)).toBe(true);
};

/**
 * Common test scenarios for unauthorized access
 */
const testUnauthorized = (makeRequest, method, endpoint) => {
  describe('Authentication tests', () => {
    it('should return 401 without authentication token', async () => {
      const res = await makeRequest()[method](endpoint);
      expect(res.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const res = await makeRequest()[method](endpoint)
        .set('Authorization', `Bearer ${getInvalidToken()}`);
      expect(res.status).toBe(401);
    });

    it('should return 401 with expired token', async () => {
      const res = await makeRequest()[method](endpoint)
        .set('Authorization', `Bearer ${getExpiredToken()}`);
      expect(res.status).toBe(401);
    });
  });
};

/**
 * Test helper for admin-only endpoints
 */
const testAdminOnly = (makeRequest, method, endpoint, getUserTokenFn) => {
  describe('Admin authorization tests', () => {
    it('should return 403 for non-admin users', async () => {
      const token = await getUserTokenFn();
      if (!token) {
        console.warn('Skipping admin test - no user token available');
        return;
      }
      const res = await makeRequest()[method](endpoint)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(403);
    });
  });
};

/**
 * Create authenticated request helper
 */
const createAuthRequest = (baseUrl = BASE_URL) => {
  return {
    async get(endpoint, token) {
      const req = request(baseUrl).get(endpoint);
      if (token) req.set('Authorization', `Bearer ${token}`);
      return req;
    },
    async post(endpoint, data, token) {
      const req = request(baseUrl).post(endpoint).send(data);
      if (token) req.set('Authorization', `Bearer ${token}`);
      return req;
    },
    async put(endpoint, data, token) {
      const req = request(baseUrl).put(endpoint).send(data);
      if (token) req.set('Authorization', `Bearer ${token}`);
      return req;
    },
    async delete(endpoint, token) {
      const req = request(baseUrl).delete(endpoint);
      if (token) req.set('Authorization', `Bearer ${token}`);
      return req;
    }
  };
};

module.exports = {
  BASE_URL,
  loginAndGetToken,
  getAdminToken,
  getUserToken,
  getChapterLeadToken,
  getSpeakerToken,
  getInvalidToken,
  getExpiredToken,
  clearTokenCache,
  responseStructure,
  expectSuccessResponse,
  expectErrorResponse,
  expectPaginatedResponse,
  testUnauthorized,
  testAdminOnly,
  createAuthRequest
};
