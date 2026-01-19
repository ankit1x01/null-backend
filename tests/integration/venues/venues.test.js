/**
 * Venues Module - Integration Tests
 * Comprehensive test cases for venues APIs
 */

const request = require('supertest');
const app = require('../../../src/index');
const venueServices = require('../../../src/modules/venues/services');
const testData = require('./venues.data');
const { getAdminToken, getUserToken, getExpiredToken } = require('../../helpers/test-utils');

// Mock the venue services
jest.mock('../../../src/modules/venues/services');

describe('Venues Module API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // GET /api/venues/getVenues
  // ============================================================
  describe('GET /api/venues/getVenues', () => {
    const endpoint = '/api/venues/getVenues';

    describe('Success Cases', () => {
      it('should return all venues', async () => {
        venueServices.getVenues.mockResolvedValue(testData.getVenues.mockData);

        const res = await request(app).get(endpoint);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
        expect(res.body.result.length).toBeGreaterThan(0);
      });

      it('should return paginated results', async () => {
        venueServices.getVenues.mockResolvedValue(testData.getVenues.paginatedMockData);

        const res = await request(app)
          .get(`${endpoint}?page=1&limit=10`);

        expect(res.status).toBe(200);
      });

      it('should filter by city', async () => {
        venueServices.getVenues.mockResolvedValue([testData.getVenues.mockData[0]]);

        const res = await request(app)
          .get(`${endpoint}?city=Tech%20City`);

        expect(res.status).toBe(200);
      });

      it('should filter by country', async () => {
        venueServices.getVenues.mockResolvedValue(testData.getVenues.mockData);

        const res = await request(app)
          .get(`${endpoint}?country=India`);

        expect(res.status).toBe(200);
      });

      it('should filter by status', async () => {
        venueServices.getVenues.mockResolvedValue(testData.getVenues.mockData);

        const res = await request(app)
          .get(`${endpoint}?status=active`);

        expect(res.status).toBe(200);
      });

      it('should filter by minimum capacity', async () => {
        venueServices.getVenues.mockResolvedValue([testData.getVenues.mockData[0]]);

        const res = await request(app)
          .get(`${endpoint}?min_capacity=300`);

        expect(res.status).toBe(200);
      });

      it('should work without authentication (public endpoint)', async () => {
        venueServices.getVenues.mockResolvedValue(testData.getVenues.mockData);

        const res = await request(app).get(endpoint);

        expect(res.status).toBe(200);
      });
    });
  });

  // ============================================================
  // GET /api/venues/getVenueById
  // ============================================================
  describe('GET /api/venues/getVenueById', () => {
    const endpoint = '/api/venues/getVenueById';

    describe('Success Cases', () => {
      it('should return venue by ID', async () => {
        venueServices.getVenueById.mockResolvedValue(testData.getVenueById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getVenueById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('id', testData.getVenueById.validId);
        expect(res.body.result).toHaveProperty('name');
        expect(res.body.result).toHaveProperty('address');
      });

      it('should include rooms in response', async () => {
        venueServices.getVenueById.mockResolvedValue(testData.getVenueById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getVenueById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('rooms');
        expect(Array.isArray(res.body.result.rooms)).toBe(true);
      });

      it('should include amenities in response', async () => {
        venueServices.getVenueById.mockResolvedValue(testData.getVenueById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getVenueById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('amenities');
        expect(Array.isArray(res.body.result.amenities)).toBe(true);
      });

      it('should include upcoming events', async () => {
        venueServices.getVenueById.mockResolvedValue(testData.getVenueById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getVenueById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('upcoming_events');
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent venue', async () => {
        venueServices.getVenueById.mockRejectedValue({
          statusCode: 404,
          message: 'Venue not found'
        });

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getVenueById.nonExistentId}`);

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
  });

  // ============================================================
  // GET /api/venues/getVenueBySlug
  // ============================================================
  describe('GET /api/venues/getVenueBySlug', () => {
    const endpoint = '/api/venues/getVenueBySlug';

    describe('Success Cases', () => {
      it('should return venue by slug', async () => {
        venueServices.getVenueBySlug.mockResolvedValue(testData.getVenueBySlug.mockData);

        const res = await request(app)
          .get(`${endpoint}?slug=${testData.getVenueBySlug.validSlug}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('slug', testData.getVenueBySlug.validSlug);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent slug', async () => {
        venueServices.getVenueBySlug.mockRejectedValue({
          statusCode: 404,
          message: 'Venue not found'
        });

        const res = await request(app)
          .get(`${endpoint}?slug=${testData.getVenueBySlug.nonExistentSlug}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 for missing slug', async () => {
        const res = await request(app).get(endpoint);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // POST /api/venues/createVenue (Admin Only)
  // ============================================================
  describe('POST /api/venues/createVenue', () => {
    const endpoint = '/api/venues/createVenue';

    describe('Success Cases', () => {
      it('should create venue with valid data', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.createVenue.validPayload;
        venueServices.createVenue.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result).toHaveProperty('id');
        expect(res.body.result).toHaveProperty('name', payload.name);
      });

      it('should create venue with minimal data', async () => {
        const { payload, expectedStatus } = testData.createVenue.minimalPayload;
        venueServices.createVenue.mockResolvedValue({ id: 4, ...payload });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should create venue with full data including rooms', async () => {
        const { payload, expectedStatus } = testData.createVenue.fullPayload;
        venueServices.createVenue.mockResolvedValue({ id: 5, ...payload });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for non-admin users', async () => {
        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(testData.createVenue.validPayload.payload);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .post(endpoint)
          .send(testData.createVenue.validPayload.payload);

        expect(res.status).toBe(401);
      });

      it('should return 401 with expired token', async () => {
        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getExpiredToken()}`)
          .send(testData.createVenue.validPayload.payload);

        expect(res.status).toBe(401);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for missing name', async () => {
        const { payload, expectedStatus } = testData.createVenue.missingName;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for missing address', async () => {
        const { payload, expectedStatus } = testData.createVenue.missingAddress;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 409 for duplicate slug', async () => {
        const { payload, expectedStatus } = testData.createVenue.duplicateSlug;
        venueServices.createVenue.mockRejectedValue({
          statusCode: 409,
          message: 'Slug already exists'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid coordinates', async () => {
        const { payload, expectedStatus } = testData.createVenue.invalidCoordinates;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // PUT /api/venues/updateVenue/:id (Admin Only)
  // ============================================================
  describe('PUT /api/venues/updateVenue/:id', () => {
    const endpoint = '/api/venues/updateVenue';

    describe('Success Cases', () => {
      it('should update venue successfully', async () => {
        const { venueId, payload, expectedStatus, expectedResponse } = testData.updateVenue.validUpdate;
        venueServices.updateVenue.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .put(`${endpoint}/${venueId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result.name).toBe(payload.name);
      });

      it('should allow partial update', async () => {
        const { venueId, payload, expectedStatus } = testData.updateVenue.partialUpdate;
        venueServices.updateVenue.mockResolvedValue({ id: venueId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${venueId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should update amenities', async () => {
        const { venueId, payload, expectedStatus } = testData.updateVenue.updateAmenities;
        venueServices.updateVenue.mockResolvedValue({ id: venueId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${venueId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should update rooms', async () => {
        const { venueId, payload, expectedStatus } = testData.updateVenue.updateRooms;
        venueServices.updateVenue.mockResolvedValue({ id: venueId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${venueId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for non-admin users', async () => {
        const { venueId, payload } = testData.updateVenue.validUpdate;

        const res = await request(app)
          .put(`${endpoint}/${venueId}`)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const { venueId, payload } = testData.updateVenue.validUpdate;

        const res = await request(app)
          .put(`${endpoint}/${venueId}`)
          .send(payload);

        expect(res.status).toBe(401);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent venue', async () => {
        const { venueId, payload, expectedStatus } = testData.updateVenue.invalidId;
        venueServices.updateVenue.mockRejectedValue({
          statusCode: 404,
          message: 'Venue not found'
        });

        const res = await request(app)
          .put(`${endpoint}/${venueId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 409 for duplicate slug', async () => {
        const { venueId, payload, expectedStatus } = testData.updateVenue.duplicateSlug;
        venueServices.updateVenue.mockRejectedValue({
          statusCode: 409,
          message: 'Slug already exists'
        });

        const res = await request(app)
          .put(`${endpoint}/${venueId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // DELETE /api/venues/deleteVenue/:id (Admin Only)
  // ============================================================
  describe('DELETE /api/venues/deleteVenue/:id', () => {
    const endpoint = '/api/venues/deleteVenue';

    describe('Success Cases', () => {
      it('should delete venue successfully', async () => {
        venueServices.deleteVenue.mockResolvedValue(testData.deleteVenue.expectedResponse);

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteVenue.validId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for non-admin users', async () => {
        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteVenue.validId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteVenue.validId}`);

        expect(res.status).toBe(401);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent venue', async () => {
        venueServices.deleteVenue.mockRejectedValue({
          statusCode: 404,
          message: 'Venue not found'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteVenue.nonExistentId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 when venue has upcoming events', async () => {
        venueServices.deleteVenue.mockRejectedValue({
          statusCode: 400,
          message: 'Cannot delete venue with upcoming events'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteVenue.venueWithEvents}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // GET /api/venues/search
  // ============================================================
  describe('GET /api/venues/search', () => {
    const endpoint = '/api/venues/search';

    describe('Success Cases', () => {
      it('should search venues by query', async () => {
        venueServices.searchVenues.mockResolvedValue(testData.searchVenues.validQuery.mockData);

        const res = await request(app)
          .get(`${endpoint}?query=${testData.searchVenues.validQuery.query}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should search by city', async () => {
        venueServices.searchVenues.mockResolvedValue(testData.searchVenues.byCity.mockData);

        const res = await request(app)
          .get(`${endpoint}?city=${encodeURIComponent(testData.searchVenues.byCity.city)}`);

        expect(res.status).toBe(200);
      });

      it('should search by minimum capacity', async () => {
        venueServices.searchVenues.mockResolvedValue(testData.searchVenues.byCapacity.mockData);

        const res = await request(app)
          .get(`${endpoint}?min_capacity=${testData.searchVenues.byCapacity.min_capacity}`);

        expect(res.status).toBe(200);
      });

      it('should search by amenities', async () => {
        venueServices.searchVenues.mockResolvedValue(testData.searchVenues.byAmenities.mockData);

        const res = await request(app)
          .get(`${endpoint}?amenities=wifi,projector`);

        expect(res.status).toBe(200);
      });

      it('should return empty array for no matches', async () => {
        venueServices.searchVenues.mockResolvedValue([]);

        const res = await request(app)
          .get(`${endpoint}?query=${testData.searchVenues.noResults.query}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toEqual([]);
      });
    });
  });

  // ============================================================
  // GET /api/venues/getVenueAvailability
  // ============================================================
  describe('GET /api/venues/getVenueAvailability', () => {
    const endpoint = '/api/venues/getVenueAvailability';

    describe('Success Cases', () => {
      it('should return venue availability', async () => {
        venueServices.getVenueAvailability.mockResolvedValue(testData.getVenueAvailability.mockData);

        const { venue_id, date } = testData.getVenueAvailability.validPayload;
        const res = await request(app)
          .get(`${endpoint}?venue_id=${venue_id}&date=${date}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('available_slots');
        expect(res.body.result).toHaveProperty('booked_slots');
      });
    });

    describe('Error Cases', () => {
      it('should return 400 for missing venue_id', async () => {
        const res = await request(app)
          .get(`${endpoint}?date=2024-02-15`);

        expect(res.status).toBe(400);
      });

      it('should return 400 for missing date', async () => {
        const res = await request(app)
          .get(`${endpoint}?venue_id=1`);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // POST /api/venues/bookVenue
  // ============================================================
  describe('POST /api/venues/bookVenue', () => {
    const endpoint = '/api/venues/bookVenue';

    describe('Success Cases', () => {
      it('should book venue successfully', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.bookVenue.validPayload;
        venueServices.bookVenue.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result).toHaveProperty('booking_id');
      });
    });

    describe('Error Cases', () => {
      it('should return 409 for booking conflict', async () => {
        const { payload, expectedStatus } = testData.bookVenue.conflictPayload;
        venueServices.bookVenue.mockRejectedValue({
          statusCode: 409,
          message: 'Venue already booked for this time'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 404 for invalid venue', async () => {
        const { payload, expectedStatus } = testData.bookVenue.invalidVenue;
        venueServices.bookVenue.mockRejectedValue({
          statusCode: 404,
          message: 'Venue not found'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for regular users', async () => {
        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(testData.bookVenue.validPayload.payload);

        expect(res.status).toBe(403);
      });
    });
  });

  // ============================================================
  // GET /api/venues/getNearbyVenues
  // ============================================================
  describe('GET /api/venues/getNearbyVenues', () => {
    const endpoint = '/api/venues/getNearbyVenues';

    describe('Success Cases', () => {
      it('should return nearby venues', async () => {
        venueServices.getNearbyVenues.mockResolvedValue(testData.getNearbyVenues.mockData);

        const { latitude, longitude, radius } = testData.getNearbyVenues.validPayload;
        const res = await request(app)
          .get(`${endpoint}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
        res.body.result.forEach(venue => {
          expect(venue).toHaveProperty('distance');
        });
      });
    });

    describe('Error Cases', () => {
      it('should return 400 for missing coordinates', async () => {
        const res = await request(app)
          .get(`${endpoint}?radius=10`);

        expect(res.status).toBe(400);
      });
    });
  });
});
