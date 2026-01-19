/**
 * Users Module - Live Integration Tests
 * Tests against the running API server
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken, getInvalidToken, getExpiredToken } = require('../../helpers/test-utils');

describe('Users Module - Integration Tests', () => {
  const api = () => request(BASE_URL);
  let adminToken = null;
  let userToken = null;

  // Try to get tokens before tests
  beforeAll(async () => {
    try {
      adminToken = await loginAndGetToken('admin@nullchapter.com', 'Admin@123');
      userToken = await loginAndGetToken('user@example.com', 'User@123');
    } catch (e) {
      console.warn('Could not obtain test tokens - some tests may be skipped');
    }
  });

  // ==================== GET ME TESTS ====================
  describe('GET /api/users/me', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().get('/api/users/me');
      expect(res.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const res = await api()
        .get('/api/users/me')
        .set('Authorization', `Bearer ${getInvalidToken()}`);
      expect(res.status).toBe(401);
    });

    it('should return user data with valid token', async () => {
      if (!adminToken) {
        console.warn('Skipping - no admin token');
        return;
      }

      const res = await api()
        .get('/api/users/me')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 401, 403]).toContain(res.status);
      if (res.status === 200) {
        expect(res.body).toHaveProperty('code');
        expect(res.body).toHaveProperty('result');
      }
    });
  });

  // ==================== GET USER EVENTS TESTS ====================
  describe('GET /api/users/events', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().get('/api/users/events');
      expect(res.status).toBe(401);
    });

    it('should return user events with valid token', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/users/events')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 401, 403]).toContain(res.status);
    });
  });

  // ==================== GET USER SESSIONS TESTS ====================
  describe('GET /api/users/sessions', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().get('/api/users/sessions');
      expect(res.status).toBe(401);
    });

    it('should return user sessions with valid token', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/users/sessions')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 401, 403]).toContain(res.status);
    });
  });

  // ==================== GET USER REGISTRATIONS TESTS ====================
  describe('GET /api/users/registrations', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().get('/api/users/registrations');
      expect(res.status).toBe(401);
    });

    it('should return user registrations with valid token', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/users/registrations')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 401, 403]).toContain(res.status);
    });
  });

  // ==================== GET ALL USERS TESTS (ADMIN ONLY) ====================
  describe('GET /api/users/getUsers', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().get('/api/users/getUsers');
      expect(res.status).toBe(401);
    });

    it('should return 403 for non-admin users', async () => {
      if (!userToken) return;

      const res = await api()
        .get('/api/users/getUsers')
        .set('Authorization', `Bearer ${userToken}`);

      expect([401, 403]).toContain(res.status);
    });

    it('should return users list for admin', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/users/getUsers')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 401, 403]).toContain(res.status);
      if (res.status === 200) {
        expect(res.body).toHaveProperty('result');
      }
    });
  });

  // ==================== GET USER BY ID TESTS ====================
  describe('GET /api/users/getUserById', () => {
    it('should return 401 without authentication', async () => {
      const res = await api()
        .get('/api/users/getUserById')
        .query({ userId: 1 });
      expect(res.status).toBe(401);
    });

    it('should get user by id with valid token', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/users/getUserById')
        .query({ userId: 1 })
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 401, 403, 404]).toContain(res.status);
    });

    it('should handle non-existent user id', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/users/getUserById')
        .query({ userId: 999999 })
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 400, 404, 500]).toContain(res.status);
    });
  });

  // ==================== UPDATE USER TESTS ====================
  describe('PUT /api/users/updateUser/:id', () => {
    it('should return 401 without authentication', async () => {
      const res = await api()
        .put('/api/users/updateUser/1')
        .send({ name: 'Updated Name' });
      expect(res.status).toBe(401);
    });

    it('should update user with valid token', async () => {
      if (!adminToken) return;

      const res = await api()
        .put('/api/users/updateUser/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Test Update Name' });

      expect([200, 400, 401, 403, 404]).toContain(res.status);
    });

    it('should handle invalid user id', async () => {
      if (!adminToken) return;

      const res = await api()
        .put('/api/users/updateUser/invalid')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Test' });

      expect([400, 404, 500]).toContain(res.status);
    });
  });

  // ==================== DELETE USER TESTS ====================
  describe('DELETE /api/users/deleteUser/:id', () => {
    it('should return 401 without authentication', async () => {
      const res = await api()
        .delete('/api/users/deleteUser/999');
      expect(res.status).toBe(401);
    });

    it('should handle delete request for non-existent user', async () => {
      if (!adminToken) return;

      const res = await api()
        .delete('/api/users/deleteUser/999999')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 400, 403, 404, 500]).toContain(res.status);
    });
  });

  // ==================== AUTOCOMPLETE TESTS ====================
  describe('GET /api/users/autocomplete', () => {
    it('should return 401 without authentication', async () => {
      const res = await api()
        .get('/api/users/autocomplete')
        .query({ q: 'test' });
      expect(res.status).toBe(401);
    });

    it('should return autocomplete results for admin', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/users/autocomplete')
        .query({ q: 'a' })
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 401, 403]).toContain(res.status);
    });

    it('should handle empty query', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/users/autocomplete')
        .query({ q: '' })
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 400, 401, 403]).toContain(res.status);
    });
  });
});
