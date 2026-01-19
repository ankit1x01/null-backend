/**
 * Events Module - Integration Tests
 * Comprehensive test cases for events APIs
 */

const request = require('supertest');
const app = require('../../../src/index');
const eventServices = require('../../../src/modules/events/services');
const testData = require('./events.data');
const { getAdminToken, getUserToken, getExpiredToken, getChapterLeadToken } = require('../../helpers/test-utils');

// Mock the event services
jest.mock('../../../src/modules/events/services');

describe('Events Module API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // GET /api/events/getEvents
  // ============================================================
  describe('GET /api/events/getEvents', () => {
    const endpoint = '/api/events/getEvents';

    describe('Success Cases', () => {
      it('should return all events', async () => {
        eventServices.getEvents.mockResolvedValue(testData.getEvents.mockData);

        const res = await request(app).get(endpoint);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
        expect(res.body.result.length).toBeGreaterThan(0);
      });

      it('should return paginated results', async () => {
        eventServices.getEvents.mockResolvedValue(testData.getEvents.paginatedMockData);

        const res = await request(app)
          .get(`${endpoint}?page=1&limit=10`);

        expect(res.status).toBe(200);
      });

      it('should filter upcoming events', async () => {
        eventServices.getEvents.mockResolvedValue(testData.getEvents.upcomingEvents.mockData);

        const res = await request(app)
          .get(`${endpoint}?filter=upcoming`);

        expect(res.status).toBe(200);
      });

      it('should filter past events', async () => {
        eventServices.getEvents.mockResolvedValue(testData.getEvents.pastEvents.mockData);

        const res = await request(app)
          .get(`${endpoint}?filter=past`);

        expect(res.status).toBe(200);
      });

      it('should filter by chapter_id', async () => {
        eventServices.getEvents.mockResolvedValue(testData.getEvents.mockData);

        const res = await request(app)
          .get(`${endpoint}?chapter_id=1`);

        expect(res.status).toBe(200);
      });

      it('should work without authentication (public endpoint)', async () => {
        eventServices.getEvents.mockResolvedValue(testData.getEvents.mockData);

        const res = await request(app).get(endpoint);

        expect(res.status).toBe(200);
      });
    });
  });

  // ============================================================
  // GET /api/events/getEventById
  // ============================================================
  describe('GET /api/events/getEventById', () => {
    const endpoint = '/api/events/getEventById';

    describe('Success Cases', () => {
      it('should return event by ID', async () => {
        eventServices.getEventById.mockResolvedValue(testData.getEventById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getEventById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('id', testData.getEventById.validId);
        expect(res.body.result).toHaveProperty('title');
        expect(res.body.result).toHaveProperty('chapter');
        expect(res.body.result).toHaveProperty('venue');
      });

      it('should include sessions in response', async () => {
        eventServices.getEventById.mockResolvedValue(testData.getEventById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getEventById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('sessions');
        expect(Array.isArray(res.body.result.sessions)).toBe(true);
      });

      it('should include organizers in response', async () => {
        eventServices.getEventById.mockResolvedValue(testData.getEventById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getEventById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('organizers');
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent event', async () => {
        eventServices.getEventById.mockRejectedValue({
          statusCode: 404,
          message: 'Event not found'
        });

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getEventById.nonExistentId}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 for missing ID', async () => {
        const res = await request(app).get(endpoint);

        expect(res.status).toBe(400);
      });

      it('should return 400 for invalid ID format', async () => {
        const res = await request(app)
          .get(`${endpoint}?id=invalid-id`);

        expect(res.status).toBe(400);
      });
    });

    describe('Access Control', () => {
      it('should return unpublished event for admin', async () => {
        eventServices.getEventById.mockResolvedValue(testData.getEventById.unpublishedMockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getEventById.unpublishedId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });

      it('should return 404 for unpublished event without auth', async () => {
        eventServices.getEventById.mockRejectedValue({
          statusCode: 404,
          message: 'Event not found'
        });

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getEventById.unpublishedId}`);

        expect(res.status).toBe(404);
      });
    });
  });

  // ============================================================
  // GET /api/events/getEventBySlug
  // ============================================================
  describe('GET /api/events/getEventBySlug', () => {
    const endpoint = '/api/events/getEventBySlug';

    describe('Success Cases', () => {
      it('should return event by slug', async () => {
        eventServices.getEventBySlug.mockResolvedValue(testData.getEventBySlug.mockData);

        const res = await request(app)
          .get(`${endpoint}?slug=${testData.getEventBySlug.validSlug}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('slug', testData.getEventBySlug.validSlug);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent slug', async () => {
        eventServices.getEventBySlug.mockRejectedValue({
          statusCode: 404,
          message: 'Event not found'
        });

        const res = await request(app)
          .get(`${endpoint}?slug=${testData.getEventBySlug.nonExistentSlug}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 for missing slug', async () => {
        const res = await request(app).get(endpoint);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // POST /api/events/createEvent
  // ============================================================
  describe('POST /api/events/createEvent', () => {
    const endpoint = '/api/events/createEvent';

    describe('Success Cases', () => {
      it('should create event with valid data', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.createEvent.validPayload;
        eventServices.createEvent.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result).toHaveProperty('id');
        expect(res.body.result).toHaveProperty('title', payload.title);
      });

      it('should create event with minimal data', async () => {
        const { payload, expectedStatus } = testData.createEvent.minimalPayload;
        eventServices.createEvent.mockResolvedValue({ id: 6, ...payload });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should create event with full data', async () => {
        const { payload, expectedStatus } = testData.createEvent.fullPayload;
        eventServices.createEvent.mockResolvedValue({ id: 7, ...payload });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should allow chapter lead to create event', async () => {
        const { payload, expectedStatus } = testData.createEvent.validPayload;
        eventServices.createEvent.mockResolvedValue({ id: 8, ...payload });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getChapterLeadToken(1)}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for regular users', async () => {
        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(testData.createEvent.validPayload.payload);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .post(endpoint)
          .send(testData.createEvent.validPayload.payload);

        expect(res.status).toBe(401);
      });

      it('should return 401 with expired token', async () => {
        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getExpiredToken()}`)
          .send(testData.createEvent.validPayload.payload);

        expect(res.status).toBe(401);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for missing title', async () => {
        const { payload, expectedStatus } = testData.createEvent.missingTitle;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for missing chapter', async () => {
        const { payload, expectedStatus } = testData.createEvent.missingChapter;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid date range', async () => {
        const { payload, expectedStatus } = testData.createEvent.invalidDateRange;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 409 for duplicate slug', async () => {
        const { payload, expectedStatus } = testData.createEvent.duplicateSlug;
        eventServices.createEvent.mockRejectedValue({
          statusCode: 409,
          message: 'Slug already exists'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 404 for invalid chapter', async () => {
        const { payload, expectedStatus } = testData.createEvent.invalidChapter;
        eventServices.createEvent.mockRejectedValue({
          statusCode: 404,
          message: 'Chapter not found'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for past start date', async () => {
        const { payload, expectedStatus } = testData.createEvent.pastDate;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // PUT /api/events/updateEvent/:id
  // ============================================================
  describe('PUT /api/events/updateEvent/:id', () => {
    const endpoint = '/api/events/updateEvent';

    describe('Success Cases', () => {
      it('should update event successfully', async () => {
        const { eventId, payload, expectedStatus, expectedResponse } = testData.updateEvent.validUpdate;
        eventServices.updateEvent.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result.title).toBe(payload.title);
      });

      it('should allow partial update', async () => {
        const { eventId, payload, expectedStatus } = testData.updateEvent.partialUpdate;
        eventServices.updateEvent.mockResolvedValue({ id: eventId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should update event status', async () => {
        const { eventId, payload, expectedStatus } = testData.updateEvent.updateStatus;
        eventServices.updateEvent.mockResolvedValue({ id: eventId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should update venue', async () => {
        const { eventId, payload, expectedStatus } = testData.updateEvent.updateVenue;
        eventServices.updateEvent.mockResolvedValue({ id: eventId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for regular users', async () => {
        const { eventId, payload } = testData.updateEvent.validUpdate;

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const { eventId, payload } = testData.updateEvent.validUpdate;

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .send(payload);

        expect(res.status).toBe(401);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent event', async () => {
        const { eventId, payload, expectedStatus } = testData.updateEvent.invalidId;
        eventServices.updateEvent.mockRejectedValue({
          statusCode: 404,
          message: 'Event not found'
        });

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid date range', async () => {
        const { eventId, payload, expectedStatus } = testData.updateEvent.invalidDateRange;

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 409 for duplicate slug', async () => {
        const { eventId, payload, expectedStatus } = testData.updateEvent.duplicateSlug;
        eventServices.updateEvent.mockRejectedValue({
          statusCode: 409,
          message: 'Slug already exists'
        });

        const res = await request(app)
          .put(`${endpoint}/${eventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // DELETE /api/events/deleteEvent/:id
  // ============================================================
  describe('DELETE /api/events/deleteEvent/:id', () => {
    const endpoint = '/api/events/deleteEvent';

    describe('Success Cases', () => {
      it('should delete event successfully', async () => {
        eventServices.deleteEvent.mockResolvedValue(testData.deleteEvent.expectedResponse);

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteEvent.validId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for regular users', async () => {
        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteEvent.validId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteEvent.validId}`);

        expect(res.status).toBe(401);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent event', async () => {
        eventServices.deleteEvent.mockRejectedValue({
          statusCode: 404,
          message: 'Event not found'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteEvent.nonExistentId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 when event has registrations', async () => {
        eventServices.deleteEvent.mockRejectedValue({
          statusCode: 400,
          message: 'Cannot delete event with registrations'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteEvent.eventWithRegistrations}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // POST /api/events/publishEvent/:id
  // ============================================================
  describe('POST /api/events/publishEvent/:id', () => {
    const endpoint = '/api/events/publishEvent';

    describe('Success Cases', () => {
      it('should publish draft event successfully', async () => {
        eventServices.publishEvent.mockResolvedValue(testData.publishEvent.expectedResponse);

        const res = await request(app)
          .post(`${endpoint}/${testData.publishEvent.draftEventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result.status).toBe('published');
      });
    });

    describe('Error Cases', () => {
      it('should return 400 for already published event', async () => {
        eventServices.publishEvent.mockRejectedValue({
          statusCode: 400,
          message: 'Event already published'
        });

        const res = await request(app)
          .post(`${endpoint}/${testData.publishEvent.alreadyPublishedId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(400);
      });

      it('should return 400 for incomplete event', async () => {
        eventServices.publishEvent.mockRejectedValue({
          statusCode: 400,
          message: 'Event is missing required fields'
        });

        const res = await request(app)
          .post(`${endpoint}/${testData.publishEvent.incompleteEventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // POST /api/events/unpublishEvent/:id
  // ============================================================
  describe('POST /api/events/unpublishEvent/:id', () => {
    const endpoint = '/api/events/unpublishEvent';

    describe('Success Cases', () => {
      it('should unpublish event successfully', async () => {
        eventServices.unpublishEvent.mockResolvedValue(testData.unpublishEvent.expectedResponse);

        const res = await request(app)
          .post(`${endpoint}/${testData.unpublishEvent.publishedEventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result.status).toBe('draft');
      });
    });

    describe('Error Cases', () => {
      it('should return 400 for draft event', async () => {
        eventServices.unpublishEvent.mockRejectedValue({
          statusCode: 400,
          message: 'Event is not published'
        });

        const res = await request(app)
          .post(`${endpoint}/${testData.unpublishEvent.draftEventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // GET /api/events/getEventRegistrations
  // ============================================================
  describe('GET /api/events/getEventRegistrations', () => {
    const endpoint = '/api/events/getEventRegistrations';

    describe('Success Cases', () => {
      it('should return event registrations', async () => {
        eventServices.getEventRegistrations.mockResolvedValue(testData.getEventRegistrations.mockData);

        const res = await request(app)
          .get(`${endpoint}?event_id=${testData.getEventRegistrations.validEventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should filter by status', async () => {
        eventServices.getEventRegistrations.mockResolvedValue(testData.getEventRegistrations.filteredByStatus.mockData);

        const res = await request(app)
          .get(`${endpoint}?event_id=${testData.getEventRegistrations.validEventId}&status=confirmed`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app)
          .get(`${endpoint}?event_id=${testData.getEventRegistrations.validEventId}`);

        expect(res.status).toBe(401);
      });
    });
  });

  // ============================================================
  // GET /api/events/getEventSessions
  // ============================================================
  describe('GET /api/events/getEventSessions', () => {
    const endpoint = '/api/events/getEventSessions';

    describe('Success Cases', () => {
      it('should return event sessions', async () => {
        eventServices.getEventSessions.mockResolvedValue(testData.getEventSessions.mockData);

        const res = await request(app)
          .get(`${endpoint}?event_id=${testData.getEventSessions.validEventId}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent event', async () => {
        eventServices.getEventSessions.mockRejectedValue({
          statusCode: 404,
          message: 'Event not found'
        });

        const res = await request(app)
          .get(`${endpoint}?event_id=${testData.getEventSessions.nonExistentEventId}`);

        expect(res.status).toBe(404);
      });
    });
  });

  // ============================================================
  // POST /api/events/duplicateEvent/:id
  // ============================================================
  describe('POST /api/events/duplicateEvent/:id', () => {
    const endpoint = '/api/events/duplicateEvent';

    describe('Success Cases', () => {
      it('should duplicate event successfully', async () => {
        eventServices.duplicateEvent.mockResolvedValue(testData.duplicateEvent.expectedResponse);

        const res = await request(app)
          .post(`${endpoint}/${testData.duplicateEvent.validEventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(testData.duplicateEvent.payload);

        expect(res.status).toBe(201);
        expect(res.body.result).toHaveProperty('id');
        expect(res.body.result.status).toBe('draft');
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for regular users', async () => {
        const res = await request(app)
          .post(`${endpoint}/${testData.duplicateEvent.validEventId}`)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(testData.duplicateEvent.payload);

        expect(res.status).toBe(403);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent event', async () => {
        eventServices.duplicateEvent.mockRejectedValue({
          statusCode: 404,
          message: 'Event not found'
        });

        const res = await request(app)
          .post(`${endpoint}/${testData.duplicateEvent.nonExistentEventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(testData.duplicateEvent.payload);

        expect(res.status).toBe(404);
      });
    });
  });

  // ============================================================
  // GET /api/events/getUpcomingEvents
  // ============================================================
  describe('GET /api/events/getUpcomingEvents', () => {
    const endpoint = '/api/events/getUpcomingEvents';

    describe('Success Cases', () => {
      it('should return upcoming events', async () => {
        eventServices.getUpcomingEvents.mockResolvedValue(testData.getUpcomingEvents.mockData);

        const res = await request(app).get(endpoint);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should limit results', async () => {
        eventServices.getUpcomingEvents.mockResolvedValue(testData.getUpcomingEvents.limitedMockData.mockData);

        const res = await request(app)
          .get(`${endpoint}?limit=5`);

        expect(res.status).toBe(200);
      });
    });
  });

  // ============================================================
  // GET /api/events/getFeaturedEvents
  // ============================================================
  describe('GET /api/events/getFeaturedEvents', () => {
    const endpoint = '/api/events/getFeaturedEvents';

    describe('Success Cases', () => {
      it('should return featured events', async () => {
        eventServices.getFeaturedEvents.mockResolvedValue(testData.getFeaturedEvents.mockData);

        const res = await request(app).get(endpoint);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
        res.body.result.forEach(event => {
          expect(event.is_featured).toBe(true);
        });
      });
    });
  });

  // ============================================================
  // GET /api/events/search
  // ============================================================
  describe('GET /api/events/search', () => {
    const endpoint = '/api/events/search';

    describe('Success Cases', () => {
      it('should search events by query', async () => {
        eventServices.searchEvents.mockResolvedValue(testData.searchEvents.validQuery.mockData);

        const res = await request(app)
          .get(`${endpoint}?query=${testData.searchEvents.validQuery.query}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should return empty array for no matches', async () => {
        eventServices.searchEvents.mockResolvedValue([]);

        const res = await request(app)
          .get(`${endpoint}?query=${testData.searchEvents.noResults.query}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toEqual([]);
      });

      it('should search with filters', async () => {
        const { query, filters, mockData } = testData.searchEvents.withFilters;
        eventServices.searchEvents.mockResolvedValue(mockData);

        const res = await request(app)
          .get(`${endpoint}?query=${query}&chapter_id=${filters.chapter_id}&event_type_id=${filters.event_type_id}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for missing query', async () => {
        const res = await request(app).get(endpoint);

        expect(res.status).toBe(400);
      });
    });
  });
});
