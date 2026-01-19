/**
 * Event Registrations Module - Integration Tests
 * Comprehensive test cases for event registration APIs
 */

const request = require('supertest');
const app = require('../../../src/index');
const registrationServices = require('../../../src/modules/event-registrations/services');
const testData = require('./registrations.data');
const { getAdminToken, getUserToken, getExpiredToken } = require('../../helpers/test-utils');

// Mock the registration services
jest.mock('../../../src/modules/event-registrations/services');

describe('Event Registrations Module API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // GET /api/event-registrations/getRegistrations
  // ============================================================
  describe('GET /api/event-registrations/getRegistrations', () => {
    const endpoint = '/api/event-registrations/getRegistrations';

    describe('Success Cases', () => {
      it('should return all registrations for admin', async () => {
        registrationServices.getRegistrations.mockResolvedValue(testData.getRegistrations.mockData);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should return paginated results', async () => {
        registrationServices.getRegistrations.mockResolvedValue(testData.getRegistrations.paginatedMockData);

        const res = await request(app)
          .get(`${endpoint}?page=1&limit=10`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });

      it('should filter by event_id', async () => {
        registrationServices.getRegistrations.mockResolvedValue(testData.getRegistrations.mockData);

        const res = await request(app)
          .get(`${endpoint}?event_id=1`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });

      it('should filter by status', async () => {
        registrationServices.getRegistrations.mockResolvedValue([testData.getRegistrations.mockData[0]]);

        const res = await request(app)
          .get(`${endpoint}?status=confirmed`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app).get(endpoint);
        expect(res.status).toBe(401);
      });

      it('should return 403 for regular users', async () => {
        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(403);
      });
    });
  });

  // ============================================================
  // GET /api/event-registrations/getRegistrationById
  // ============================================================
  describe('GET /api/event-registrations/getRegistrationById', () => {
    const endpoint = '/api/event-registrations/getRegistrationById';

    describe('Success Cases', () => {
      it('should return registration by ID', async () => {
        registrationServices.getRegistrationById.mockResolvedValue(testData.getRegistrationById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getRegistrationById.validId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('id', testData.getRegistrationById.validId);
        expect(res.body.result).toHaveProperty('user');
        expect(res.body.result).toHaveProperty('event');
      });

      it('should include QR code in response', async () => {
        registrationServices.getRegistrationById.mockResolvedValue(testData.getRegistrationById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getRegistrationById.validId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('qr_code');
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent registration', async () => {
        registrationServices.getRegistrationById.mockRejectedValue({
          statusCode: 404,
          message: 'Registration not found'
        });

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getRegistrationById.nonExistentId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 for missing ID', async () => {
        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // POST /api/event-registrations/register
  // ============================================================
  describe('POST /api/event-registrations/register', () => {
    const endpoint = '/api/event-registrations/register';

    describe('Success Cases', () => {
      it('should register for event successfully', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.register.validPayload;
        registrationServices.register.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result).toHaveProperty('id');
        expect(res.body.result).toHaveProperty('qr_code');
      });

      it('should register with minimal data', async () => {
        const { payload, expectedStatus } = testData.register.minimalPayload;
        registrationServices.register.mockResolvedValue({ id: 4, ...payload, status: 'confirmed' });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should register and get waitlisted when event at capacity', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.register.waitlistedPayload;
        registrationServices.register.mockResolvedValue({ id: 5, ...payload, ...expectedResponse });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result.status).toBe('waitlisted');
      });
    });

    describe('Authentication Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app)
          .post(endpoint)
          .send(testData.register.validPayload.payload);

        expect(res.status).toBe(401);
      });

      it('should return 401 with expired token', async () => {
        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getExpiredToken()}`)
          .send(testData.register.validPayload.payload);

        expect(res.status).toBe(401);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for missing event_id', async () => {
        const { payload, expectedStatus } = testData.register.missingEventId;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 404 for invalid event_id', async () => {
        const { payload, expectedStatus } = testData.register.invalidEventId;
        registrationServices.register.mockRejectedValue({
          statusCode: 404,
          message: 'Event not found'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 409 when already registered', async () => {
        const { payload, expectedStatus } = testData.register.alreadyRegistered;
        registrationServices.register.mockRejectedValue({
          statusCode: 409,
          message: 'Already registered for this event'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 when registration is closed', async () => {
        const { payload, expectedStatus } = testData.register.eventClosed;
        registrationServices.register.mockRejectedValue({
          statusCode: 400,
          message: 'Registration is closed'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for past event', async () => {
        const { payload, expectedStatus } = testData.register.pastEvent;
        registrationServices.register.mockRejectedValue({
          statusCode: 400,
          message: 'Cannot register for past event'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // PUT /api/event-registrations/updateRegistration/:id
  // ============================================================
  describe('PUT /api/event-registrations/updateRegistration/:id', () => {
    const endpoint = '/api/event-registrations/updateRegistration';

    describe('Success Cases', () => {
      it('should update registration successfully', async () => {
        const { registrationId, payload, expectedStatus } = testData.updateRegistration.validUpdate;
        registrationServices.updateRegistration.mockResolvedValue({ id: registrationId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getUserToken(10)}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should allow admin to update status', async () => {
        const { registrationId, payload, expectedStatus } = testData.updateRegistration.updateStatus;
        registrationServices.updateRegistration.mockResolvedValue({ id: registrationId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent registration', async () => {
        const { registrationId, payload, expectedStatus } = testData.updateRegistration.invalidId;
        registrationServices.updateRegistration.mockRejectedValue({
          statusCode: 404,
          message: 'Registration not found'
        });

        const res = await request(app)
          .put(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid status', async () => {
        const { registrationId, payload, expectedStatus } = testData.updateRegistration.invalidStatus;

        const res = await request(app)
          .put(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 403 when updating others registration', async () => {
        const { registrationId, payload, expectedStatus } = testData.updateRegistration.cannotUpdateOthers;
        registrationServices.updateRegistration.mockRejectedValue({
          statusCode: 403,
          message: 'Cannot update other user registration'
        });

        const res = await request(app)
          .put(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getUserToken(20)}`) // Different user
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // DELETE /api/event-registrations/cancelRegistration/:id
  // ============================================================
  describe('DELETE /api/event-registrations/cancelRegistration/:id', () => {
    const endpoint = '/api/event-registrations/cancelRegistration';

    describe('Success Cases', () => {
      it('should cancel registration successfully', async () => {
        registrationServices.cancelRegistration.mockResolvedValue(testData.cancelRegistration.expectedResponse);

        const res = await request(app)
          .delete(`${endpoint}/${testData.cancelRegistration.validId}`)
          .set('Authorization', `Bearer ${getUserToken(10)}`);

        expect(res.status).toBe(200);
      });

      it('should allow admin to cancel any registration', async () => {
        registrationServices.cancelRegistration.mockResolvedValue(testData.cancelRegistration.expectedResponse);

        const res = await request(app)
          .delete(`${endpoint}/${testData.cancelRegistration.validId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent registration', async () => {
        registrationServices.cancelRegistration.mockRejectedValue({
          statusCode: 404,
          message: 'Registration not found'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.cancelRegistration.nonExistentId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 when already checked in', async () => {
        registrationServices.cancelRegistration.mockRejectedValue({
          statusCode: 400,
          message: 'Cannot cancel after check-in'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.cancelRegistration.checkedInId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // POST /api/event-registrations/checkIn/:id
  // ============================================================
  describe('POST /api/event-registrations/checkIn/:id', () => {
    const endpoint = '/api/event-registrations/checkIn';

    describe('Success Cases', () => {
      it('should check in successfully', async () => {
        const { registrationId, payload, expectedStatus } = testData.checkIn.validPayload;
        registrationServices.checkIn.mockResolvedValue({
          message: 'Check-in successful',
          check_in_time: new Date().toISOString()
        });

        const res = await request(app)
          .post(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Error Cases', () => {
      it('should return 400 when already checked in', async () => {
        const { registrationId, payload, expectedStatus } = testData.checkIn.alreadyCheckedIn;
        registrationServices.checkIn.mockRejectedValue({
          statusCode: 400,
          message: 'Already checked in'
        });

        const res = await request(app)
          .post(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid QR code', async () => {
        const { registrationId, payload, expectedStatus } = testData.checkIn.invalidQrCode;
        registrationServices.checkIn.mockRejectedValue({
          statusCode: 400,
          message: 'Invalid QR code'
        });

        const res = await request(app)
          .post(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for cancelled registration', async () => {
        const { registrationId, payload, expectedStatus } = testData.checkIn.cancelledRegistration;
        registrationServices.checkIn.mockRejectedValue({
          statusCode: 400,
          message: 'Registration is cancelled'
        });

        const res = await request(app)
          .post(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for regular users', async () => {
        const { registrationId, payload } = testData.checkIn.validPayload;

        const res = await request(app)
          .post(`${endpoint}/${registrationId}`)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(403);
      });
    });
  });

  // ============================================================
  // POST /api/event-registrations/bulkCheckIn
  // ============================================================
  describe('POST /api/event-registrations/bulkCheckIn', () => {
    const endpoint = '/api/event-registrations/bulkCheckIn';

    describe('Success Cases', () => {
      it('should bulk check in successfully', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.bulkCheckIn.validPayload;
        registrationServices.bulkCheckIn.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result).toHaveProperty('success_count');
      });

      it('should return partial success', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.bulkCheckIn.partialSuccess;
        registrationServices.bulkCheckIn.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result.failed_count).toBeGreaterThan(0);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for missing event_id', async () => {
        const { payload, expectedStatus } = testData.bulkCheckIn.missingEventId;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for empty registration_ids', async () => {
        const { payload, expectedStatus } = testData.bulkCheckIn.emptyRegistrationIds;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // POST /api/event-registrations/massUpdate
  // ============================================================
  describe('POST /api/event-registrations/massUpdate', () => {
    const endpoint = '/api/event-registrations/massUpdate';

    describe('Success Cases', () => {
      it('should mass update registrations', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.massUpdate.validPayload;
        registrationServices.massUpdate.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result).toHaveProperty('updated_count');
      });

      it('should send notifications', async () => {
        const { payload, expectedStatus } = testData.massUpdate.sendNotification;
        registrationServices.massUpdate.mockResolvedValue({ updated_count: 2, notifications_sent: 2 });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for invalid status', async () => {
        const { payload, expectedStatus } = testData.massUpdate.invalidStatus;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // GET /api/event-registrations/getMyRegistrations
  // ============================================================
  describe('GET /api/event-registrations/getMyRegistrations', () => {
    const endpoint = '/api/event-registrations/getMyRegistrations';

    describe('Success Cases', () => {
      it('should return user registrations', async () => {
        registrationServices.getMyRegistrations.mockResolvedValue(testData.getMyRegistrations.mockData);

        const res = await request(app)
          .get(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should filter upcoming registrations', async () => {
        registrationServices.getMyRegistrations.mockResolvedValue(testData.getMyRegistrations.upcomingMockData);

        const res = await request(app)
          .get(`${endpoint}?filter=upcoming`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
      });

      it('should filter past registrations', async () => {
        registrationServices.getMyRegistrations.mockResolvedValue(testData.getMyRegistrations.pastMockData);

        const res = await request(app)
          .get(`${endpoint}?filter=past`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(200);
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
  // GET /api/event-registrations/getEventStats
  // ============================================================
  describe('GET /api/event-registrations/getEventStats', () => {
    const endpoint = '/api/event-registrations/getEventStats';

    describe('Success Cases', () => {
      it('should return event registration stats', async () => {
        registrationServices.getEventStats.mockResolvedValue(testData.getEventStats.mockData);

        const res = await request(app)
          .get(`${endpoint}?event_id=${testData.getEventStats.validEventId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('total_registrations');
        expect(res.body.result).toHaveProperty('confirmed');
        expect(res.body.result).toHaveProperty('check_in_rate');
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for regular users', async () => {
        const res = await request(app)
          .get(`${endpoint}?event_id=${testData.getEventStats.validEventId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(403);
      });
    });
  });

  // ============================================================
  // POST /api/event-registrations/exportRegistrations
  // ============================================================
  describe('POST /api/event-registrations/exportRegistrations', () => {
    const endpoint = '/api/event-registrations/exportRegistrations';

    describe('Success Cases', () => {
      it('should export registrations as CSV', async () => {
        const { payload, expectedStatus } = testData.exportRegistrations.validPayload;
        registrationServices.exportRegistrations.mockResolvedValue({ url: 'https://example.com/export.csv' });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should export registrations as Excel', async () => {
        const { payload, expectedStatus } = testData.exportRegistrations.excelFormat;
        registrationServices.exportRegistrations.mockResolvedValue({ url: 'https://example.com/export.xlsx' });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for invalid format', async () => {
        const { payload, expectedStatus } = testData.exportRegistrations.invalidFormat;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // POST /api/event-registrations/sendReminder
  // ============================================================
  describe('POST /api/event-registrations/sendReminder', () => {
    const endpoint = '/api/event-registrations/sendReminder';

    describe('Success Cases', () => {
      it('should send reminder to selected registrations', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.sendReminder.validPayload;
        registrationServices.sendReminder.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result).toHaveProperty('sent_count');
      });

      it('should send reminder to all registrations', async () => {
        const { payload, expectedStatus } = testData.sendReminder.sendToAll;
        registrationServices.sendReminder.mockResolvedValue({ sent_count: 150 });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for missing message', async () => {
        const { payload, expectedStatus } = testData.sendReminder.missingMessage;

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
          .send(testData.sendReminder.validPayload.payload);

        expect(res.status).toBe(403);
      });
    });
  });
});
