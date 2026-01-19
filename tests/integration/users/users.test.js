/**
 * Users Module - Integration Tests
 * Comprehensive test cases for users APIs
 */

const request = require('supertest');
const app = require('../../../src/index');
const userServices = require('../../../src/modules/users/services');
const testData = require('./users.data');
const { getAdminToken, getUserToken, getExpiredToken } = require('../../helpers/test-utils');

// Mock the user services
jest.mock('../../../src/modules/users/services');

describe('Users Module API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // GET /api/users/me
  // ============================================================
  describe('GET /api/users/me', () => {
    const endpoint = '/api/users/me';

    describe('Success Cases', () => {
      it('should return current user profile', async () => {
        userServices.getMe.mockResolvedValue(testData.getMe.mockData);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('id');
        expect(res.body.result).toHaveProperty('email');
        expect(res.body.result).toHaveProperty('name');
      });

      it('should not include password in response', async () => {
        userServices.getMe.mockResolvedValue(testData.getMe.mockData);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result.password).toBeUndefined();
      });

      it('should return admin status for admin user', async () => {
        userServices.getMe.mockResolvedValue({ ...testData.getMe.mockData, admin: true });

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result.admin).toBe(true);
      });
    });

    describe('Authentication Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app).get(endpoint);
        expect(res.status).toBe(401);
      });

      it('should return 401 with invalid token', async () => {
        const res = await request(app)
          .get(endpoint)
          .set('Authorization', 'Bearer invalid-token');

        expect(res.status).toBe(401);
      });

      it('should return 401 with expired token', async () => {
        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getExpiredToken()}`);

        expect(res.status).toBe(401);
      });

      it('should return 401 with malformed authorization header', async () => {
        const res = await request(app)
          .get(endpoint)
          .set('Authorization', 'InvalidFormat');

        expect(res.status).toBe(401);
      });
    });
  });

  // ============================================================
  // GET /api/users/getUsers (Admin Only)
  // ============================================================
  describe('GET /api/users/getUsers', () => {
    const endpoint = '/api/users/getUsers';

    describe('Success Cases', () => {
      it('should return all users for admin', async () => {
        userServices.getUsers.mockResolvedValue(testData.getUsers.mockData);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should return paginated results', async () => {
        userServices.getUsers.mockResolvedValue(testData.getUsers.paginatedMockData);

        const res = await request(app)
          .get(`${endpoint}?page=1&limit=10`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });

      it('should filter by search query', async () => {
        userServices.getUsers.mockResolvedValue([testData.getUsers.mockData[1]]);

        const res = await request(app)
          .get(`${endpoint}?search=user`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for non-admin users', async () => {
        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app).get(endpoint);
        expect(res.status).toBe(401);
      });
    });
  });

  // ============================================================
  // GET /api/users/getUserById
  // ============================================================
  describe('GET /api/users/getUserById', () => {
    const endpoint = '/api/users/getUserById';

    describe('Success Cases', () => {
      it('should return user by ID', async () => {
        userServices.getUserById.mockResolvedValue(testData.getUserById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getUserById.validId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('id', testData.getUserById.validId);
      });

      it('should not include sensitive data', async () => {
        userServices.getUserById.mockResolvedValue(testData.getUserById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getUserById.validId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result.password).toBeUndefined();
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent user', async () => {
        userServices.getUserById.mockRejectedValue({
          statusCode: 404,
          message: 'User not found'
        });

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getUserById.nonExistentId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 for missing ID', async () => {
        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(400);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .get(`${endpoint}?id=${testData.getUserById.validId}`);

        expect(res.status).toBe(401);
      });
    });
  });

  // ============================================================
  // PUT /api/users/updateUser/:id
  // ============================================================
  describe('PUT /api/users/updateUser/:id', () => {
    const endpoint = '/api/users/updateUser';

    describe('Success Cases', () => {
      it('should update user profile successfully', async () => {
        const { payload } = testData.updateUser.validUpdate;
        userServices.updateUser.mockResolvedValue({ ...testData.getUserById.mockData, ...payload });

        const res = await request(app)
          .put(`${endpoint}/2`)
          .set('Authorization', `Bearer ${getUserToken(2)}`)
          .send(payload);

        expect(res.status).toBe(200);
        expect(res.body.result.name).toBe(payload.name);
      });

      it('should allow partial updates', async () => {
        const { payload } = testData.updateUser.partialUpdate;
        userServices.updateUser.mockResolvedValue({ ...testData.getUserById.mockData, ...payload });

        const res = await request(app)
          .put(`${endpoint}/2`)
          .set('Authorization', `Bearer ${getUserToken(2)}`)
          .send(payload);

        expect(res.status).toBe(200);
        expect(res.body.result.bio).toBe(payload.bio);
      });

      it('should allow admin to update any user', async () => {
        const { payload } = testData.updateUser.validUpdate;
        userServices.updateUser.mockResolvedValue({ ...testData.getUserById.mockData, ...payload });

        const res = await request(app)
          .put(`${endpoint}/2`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(200);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 when updating another user profile', async () => {
        const res = await request(app)
          .put(`${endpoint}/3`) // Different user
          .set('Authorization', `Bearer ${getUserToken(2)}`)
          .send(testData.updateUser.validUpdate.payload);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .put(`${endpoint}/2`)
          .send(testData.updateUser.validUpdate.payload);

        expect(res.status).toBe(401);
      });
    });

    describe('Validation Errors', () => {
      it('should return 409 for duplicate handle', async () => {
        const { payload, expectedStatus } = testData.updateUser.duplicateHandle;
        userServices.updateUser.mockRejectedValue({
          statusCode: 409,
          message: 'Handle already taken'
        });

        const res = await request(app)
          .put(`${endpoint}/2`)
          .set('Authorization', `Bearer ${getUserToken(2)}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid email', async () => {
        const { payload, expectedStatus } = testData.updateUser.invalidEmail;

        const res = await request(app)
          .put(`${endpoint}/2`)
          .set('Authorization', `Bearer ${getUserToken(2)}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for empty name', async () => {
        const { payload, expectedStatus } = testData.updateUser.emptyName;

        const res = await request(app)
          .put(`${endpoint}/2`)
          .set('Authorization', `Bearer ${getUserToken(2)}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Edge Cases', () => {
      it('should return 404 for non-existent user', async () => {
        userServices.updateUser.mockRejectedValue({
          statusCode: 404,
          message: 'User not found'
        });

        const res = await request(app)
          .put(`${endpoint}/99999`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(testData.updateUser.validUpdate.payload);

        expect(res.status).toBe(404);
      });
    });
  });

  // ============================================================
  // DELETE /api/users/deleteUser/:id
  // ============================================================
  describe('DELETE /api/users/deleteUser/:id', () => {
    const endpoint = '/api/users/deleteUser';

    describe('Success Cases', () => {
      it('should delete user successfully (admin)', async () => {
        userServices.deleteUser.mockResolvedValue({ message: 'User deleted' });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteUser.validId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for non-admin users', async () => {
        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteUser.validId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(403);
      });

      it('should return 403 when trying to delete admin', async () => {
        userServices.deleteUser.mockRejectedValue({
          statusCode: 403,
          message: 'Cannot delete admin user'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteUser.adminId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteUser.validId}`);

        expect(res.status).toBe(401);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent user', async () => {
        userServices.deleteUser.mockRejectedValue({
          statusCode: 404,
          message: 'User not found'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteUser.nonExistentId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(404);
      });
    });
  });

  // ============================================================
  // GET /api/users/events
  // ============================================================
  describe('GET /api/users/events', () => {
    const endpoint = '/api/users/events';

    describe('Success Cases', () => {
      it('should return user events', async () => {
        userServices.getUserEvents.mockResolvedValue(testData.getUserEvents.mockData);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should return empty array if no events', async () => {
        userServices.getUserEvents.mockResolvedValue([]);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toEqual([]);
      });
    });

    describe('Authentication Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app).get(endpoint);
        expect(res.status).toBe(401);
      });
    });
  });

  // ============================================================
  // GET /api/users/sessions
  // ============================================================
  describe('GET /api/users/sessions', () => {
    const endpoint = '/api/users/sessions';

    describe('Success Cases', () => {
      it('should return user sessions', async () => {
        userServices.getUserSessions.mockResolvedValue(testData.getUserSessions.mockData);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });
    });

    describe('Authentication Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app).get(endpoint);
        expect(res.status).toBe(401);
      });
    });
  });

  // ============================================================
  // GET /api/users/registrations
  // ============================================================
  describe('GET /api/users/registrations', () => {
    const endpoint = '/api/users/registrations';

    describe('Success Cases', () => {
      it('should return user registrations', async () => {
        userServices.getUserRegistrations.mockResolvedValue(testData.getUserRegistrations.mockData);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });
    });

    describe('Authentication Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app).get(endpoint);
        expect(res.status).toBe(401);
      });
    });
  });

  // ============================================================
  // GET /api/users/public/:id
  // ============================================================
  describe('GET /api/users/public/:id', () => {
    const endpoint = '/api/users/public';

    describe('Success Cases', () => {
      it('should return public profile without authentication', async () => {
        userServices.getPublicProfile.mockResolvedValue(testData.publicProfile.mockData);

        const res = await request(app)
          .get(`${endpoint}/${testData.publicProfile.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('name');
      });

      it('should not include private fields', async () => {
        userServices.getPublicProfile.mockResolvedValue(testData.publicProfile.mockData);

        const res = await request(app)
          .get(`${endpoint}/${testData.publicProfile.validId}`);

        expect(res.status).toBe(200);
        testData.publicProfile.privateFields.forEach(field => {
          expect(res.body.result[field]).toBeUndefined();
        });
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent user', async () => {
        userServices.getPublicProfile.mockRejectedValue({
          statusCode: 404,
          message: 'User not found'
        });

        const res = await request(app)
          .get(`${endpoint}/${testData.publicProfile.nonExistentId}`);

        expect(res.status).toBe(404);
      });
    });
  });

  // ============================================================
  // GET /api/users/autocomplete
  // ============================================================
  describe('GET /api/users/autocomplete', () => {
    const endpoint = '/api/users/autocomplete';

    describe('Success Cases', () => {
      it('should return matching users', async () => {
        userServices.autocomplete.mockResolvedValue(testData.autocomplete.mockData);

        const res = await request(app)
          .get(`${endpoint}?query=${testData.autocomplete.validQuery.query}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should return empty array for no matches', async () => {
        userServices.autocomplete.mockResolvedValue([]);

        const res = await request(app)
          .get(`${endpoint}?query=${testData.autocomplete.noResults.query}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toEqual([]);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for empty query', async () => {
        const res = await request(app)
          .get(`${endpoint}?query=`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(400);
      });
    });

    describe('Authentication Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app)
          .get(`${endpoint}?query=test`);

        expect(res.status).toBe(401);
      });
    });
  });
});
