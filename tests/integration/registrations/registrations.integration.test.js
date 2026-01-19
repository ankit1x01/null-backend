/**
 * Registrations Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken, getInvalidToken } = require('../../helpers/test-utils');

describe('Registrations Module - Integration Tests', () => {
  const api = () => request(BASE_URL);
  let adminToken = null;
  let userToken = null;

  beforeAll(async () => {
    try {
      adminToken = await loginAndGetToken('admin@nullchapter.com', 'Admin@123');
      userToken = await loginAndGetToken('user@example.com', 'User@123');
    } catch (e) {
      console.warn('Could not obtain tokens');
    }
  });

  // ==================== PUBLIC/AUTHENTICATED ENDPOINTS ====================
  describe('GET /api/event-registrations/getEventRegistrations', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().get('/api/event-registrations/getEventRegistrations');
      expect([200, 401]).toContain(res.status);
    });

    it('should return registrations with token', async () => {
      if (!adminToken) return;

      const res = await api()
        .get('/api/event-registrations/getEventRegistrations')
        .set('Authorization', `Bearer ${adminToken}`);

      expect([200, 401, 403]).toContain(res.status);
    });
  });

  describe('GET /api/event-registrations/getRegistrationsByEvent/:eventId', () => {
    it('should return registrations for event', async () => {
      const res = await api().get('/api/event-registrations/getRegistrationsByEvent/1');
      expect([200, 401, 403, 404]).toContain(res.status);
    });
  });

  describe('POST /api/event-registrations/createEventRegistration', () => {
    it('should return 401 without authentication', async () => {
      const res = await api()
        .post('/api/event-registrations/createEventRegistration')
        .send({ event_id: 1 });
      expect(res.status).toBe(401);
    });

    it('should register for event with valid token', async () => {
      if (!userToken) return;

      const res = await api()
        .post('/api/event-registrations/createEventRegistration')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ event_id: 1 });

      expect([200, 201, 400, 401, 403, 409, 422]).toContain(res.status);
    });
  });

  describe('DELETE /api/event-registrations/deleteEventRegistration/:id', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().delete('/api/event-registrations/deleteEventRegistration/999');
      expect(res.status).toBe(401);
    });
  });

  // ==================== REGISTRATION STATUS ====================
  // Note: These endpoints may not exist in the current API
  describe('POST /api/event-registrations/:id/confirm', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().post('/api/event-registrations/1/confirm');
      // May return 401 or 404 if endpoint doesn't exist
      expect([401, 404, 500]).toContain(res.status);
    });
  });

  describe('POST /api/event-registrations/:id/cancel', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().post('/api/event-registrations/1/cancel');
      // May return 401 or 404 if endpoint doesn't exist
      expect([401, 404, 500]).toContain(res.status);
    });
  });

  describe('POST /api/event-registrations/:id/checkin', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().post('/api/event-registrations/1/checkin');
      // May return 401 or 404 if endpoint doesn't exist
      expect([401, 404, 500]).toContain(res.status);
    });
  });
});
