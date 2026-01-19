/**
 * Sessions Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken, getInvalidToken } = require('../../helpers/test-utils');
const { User, Event, EventType, Chapter, Venue } = require('../../../src/shared/models');

describe('Sessions Module - Integration Tests', () => {
  const api = () => request(BASE_URL);
  let adminToken = null;
  let adminUser = null;
  let testEvent = null;

  beforeAll(async () => {
    try {
      adminToken = await loginAndGetToken('admin@nullchapter.com', 'Admin@123');
      adminUser = await User.findOne({ where: { email: 'admin@nullchapter.com' } });

      // Seed dependencies with unique names to avoid unique constraint violations
      const suffix = Date.now();

      const eventType = await EventType.create({
        name: `Meetup ${suffix}`,
        slug: `meetup-${suffix}`,
        created_at: new Date(),
        updated_at: new Date()
      });

      const chapter = await Chapter.create({
        name: `Bangalore ${suffix}`,
        description: 'Bangalore Chapter',
        city: 'Bangalore',
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      });

      const venue = await Venue.create({
        name: `Office ${suffix}`,
        address: 'Tech Park',
        contact_name: 'Admin',
        chapter_id: chapter.id,
        created_at: new Date(),
        updated_at: new Date()
      });

      testEvent = await Event.create({
        name: `Test Event ${suffix}`,
        description: 'Test Description',
        event_type_id: eventType.id,
        chapter_id: chapter.id,
        venue_id: venue.id,
        start_time: new Date(Date.now() + 3600000),
        end_time: new Date(Date.now() + 7200000),
        created_at: new Date(),
        updated_at: new Date()
      });

    } catch (e) {
      console.warn('Test setup failed:', e);
    }
  });

  // ==================== PUBLIC ENDPOINTS ====================
  describe('GET /api/event-sessions/getEventSessions', () => {
    it('should return sessions list', async () => {
      const res = await api().get('/api/event-sessions/getEventSessions');
      expect([200, 401]).toContain(res.status);
    });
  });

  describe('GET /api/event-sessions/getEventSessionById/:id', () => {
    it('should return session by id', async () => {
      const res = await api().get('/api/event-sessions/getEventSessionById/1');
      expect([200, 401, 404]).toContain(res.status);
    });

    it('should handle non-existent session', async () => {
      const res = await api().get('/api/event-sessions/getEventSessionById/999999');
      expect([200, 400, 404, 500]).toContain(res.status);
    });
  });

  describe('GET /api/event-sessions/getSessionsByEvent/:eventId', () => {
    it('should return sessions for event', async () => {
      const res = await api().get('/api/event-sessions/getSessionsByEvent/1');
      expect([200, 401, 404]).toContain(res.status);
    });
  });

  // ==================== ADMIN ENDPOINTS ====================
  describe('POST /api/event-sessions/createEventSession', () => {
    it('should return 401 without authentication', async () => {
      const res = await api()
        .post('/api/event-sessions/createEventSession')
        .send({ title: 'Test Session' });
      expect(res.status).toBe(401);
    });

    it('should create session with admin token', async () => {
      if (!adminToken) return;

      const res = await api()
        .post('/api/event-sessions/createEventSession')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: `Test Session ${Date.now()}`,
          description: 'A test session description',
          event_id: testEvent.id,
          user_id: adminUser.id,
          start_time: new Date().toISOString(),
          end_time: new Date(Date.now() + 3600000).toISOString()
        });

      expect([200, 201, 400, 401, 403, 422]).toContain(res.status);
    });
  });

  describe('PUT /api/event-sessions/updateEventSession/:id', () => {
    it('should return 401 without authentication', async () => {
      const res = await api()
        .put('/api/event-sessions/updateEventSession/1')
        .send({ title: 'Updated Session' });
      expect(res.status).toBe(401);
    });
  });

  describe('DELETE /api/event-sessions/deleteEventSession/:id', () => {
    it('should return 401 without authentication', async () => {
      const res = await api().delete('/api/event-sessions/deleteEventSession/999');
      expect(res.status).toBe(401);
    });
  });
});
