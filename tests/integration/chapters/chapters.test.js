/**
 * Chapters Module - Integration Tests
 * Comprehensive test cases for chapters APIs
 */

const request = require('supertest');
const app = require('../../../src/index');
const chapterServices = require('../../../src/modules/chapters/services');
const testData = require('./chapters.data');
const { getAdminToken, getUserToken, getExpiredToken } = require('../../helpers/test-utils');

// Mock the chapter services
jest.mock('../../../src/modules/chapters/services');

describe('Chapters Module API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // GET /api/chapters/getChapters
  // ============================================================
  describe('GET /api/chapters/getChapters', () => {
    const endpoint = '/api/chapters/getChapters';

    describe('Success Cases', () => {
      it('should return all chapters', async () => {
        chapterServices.getChapters.mockResolvedValue(testData.getChapters.mockData);

        const res = await request(app).get(endpoint);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
        expect(res.body.result.length).toBeGreaterThan(0);
      });

      it('should return paginated results', async () => {
        chapterServices.getChapters.mockResolvedValue(testData.getChapters.paginatedMockData);

        const res = await request(app)
          .get(`${endpoint}?page=1&limit=10`);

        expect(res.status).toBe(200);
      });

      it('should filter chapters by status', async () => {
        chapterServices.getChapters.mockResolvedValue(testData.getChapters.filteredByStatus.mockData);

        const res = await request(app)
          .get(`${endpoint}?status=active`);

        expect(res.status).toBe(200);
        res.body.result.forEach(chapter => {
          expect(chapter.status).toBe('active');
        });
      });

      it('should filter chapters by country', async () => {
        chapterServices.getChapters.mockResolvedValue(testData.getChapters.filteredByCountry.mockData);

        const res = await request(app)
          .get(`${endpoint}?country=USA`);

        expect(res.status).toBe(200);
        res.body.result.forEach(chapter => {
          expect(chapter.country).toBe('USA');
        });
      });

      it('should sort chapters by name', async () => {
        chapterServices.getChapters.mockResolvedValue(testData.getChapters.sortedByName.mockData);

        const res = await request(app)
          .get(`${endpoint}?sort=name&order=asc`);

        expect(res.status).toBe(200);
      });

      it('should work without authentication (public endpoint)', async () => {
        chapterServices.getChapters.mockResolvedValue(testData.getChapters.mockData);

        const res = await request(app).get(endpoint);

        expect(res.status).toBe(200);
      });
    });
  });

  // ============================================================
  // GET /api/chapters/getChapterById
  // ============================================================
  describe('GET /api/chapters/getChapterById', () => {
    const endpoint = '/api/chapters/getChapterById';

    describe('Success Cases', () => {
      it('should return chapter by ID', async () => {
        chapterServices.getChapterById.mockResolvedValue(testData.getChapterById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getChapterById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('id', testData.getChapterById.validId);
        expect(res.body.result).toHaveProperty('name');
        expect(res.body.result).toHaveProperty('slug');
      });

      it('should include chapter leads in response', async () => {
        chapterServices.getChapterById.mockResolvedValue(testData.getChapterById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getChapterById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('leads');
        expect(Array.isArray(res.body.result.leads)).toBe(true);
      });

      it('should include social links', async () => {
        chapterServices.getChapterById.mockResolvedValue(testData.getChapterById.mockData);

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getChapterById.validId}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('social_links');
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent chapter', async () => {
        chapterServices.getChapterById.mockRejectedValue({
          statusCode: 404,
          message: 'Chapter not found'
        });

        const res = await request(app)
          .get(`${endpoint}?id=${testData.getChapterById.nonExistentId}`);

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
  // GET /api/chapters/getChapterBySlug
  // ============================================================
  describe('GET /api/chapters/getChapterBySlug', () => {
    const endpoint = '/api/chapters/getChapterBySlug';

    describe('Success Cases', () => {
      it('should return chapter by slug', async () => {
        chapterServices.getChapterBySlug.mockResolvedValue(testData.getChapterBySlug.mockData);

        const res = await request(app)
          .get(`${endpoint}?slug=${testData.getChapterBySlug.validSlug}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('slug', testData.getChapterBySlug.validSlug);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent slug', async () => {
        chapterServices.getChapterBySlug.mockRejectedValue({
          statusCode: 404,
          message: 'Chapter not found'
        });

        const res = await request(app)
          .get(`${endpoint}?slug=${testData.getChapterBySlug.nonExistentSlug}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 for missing slug', async () => {
        const res = await request(app).get(endpoint);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // POST /api/chapters/createChapter (Admin Only)
  // ============================================================
  describe('POST /api/chapters/createChapter', () => {
    const endpoint = '/api/chapters/createChapter';

    describe('Success Cases', () => {
      it('should create chapter with valid data', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.createChapter.validPayload;
        chapterServices.createChapter.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result).toHaveProperty('id');
        expect(res.body.result).toHaveProperty('name', payload.name);
      });

      it('should create chapter with minimal data', async () => {
        const { payload, expectedStatus } = testData.createChapter.minimalPayload;
        chapterServices.createChapter.mockResolvedValue({ id: 4, ...payload });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should create chapter with full data including social links', async () => {
        const { payload, expectedStatus } = testData.createChapter.fullPayload;
        chapterServices.createChapter.mockResolvedValue({ id: 5, ...payload });

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
          .send(testData.createChapter.validPayload.payload);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .post(endpoint)
          .send(testData.createChapter.validPayload.payload);

        expect(res.status).toBe(401);
      });

      it('should return 401 with expired token', async () => {
        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getExpiredToken()}`)
          .send(testData.createChapter.validPayload.payload);

        expect(res.status).toBe(401);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for missing name', async () => {
        const { payload, expectedStatus } = testData.createChapter.missingName;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for missing slug', async () => {
        const { payload, expectedStatus } = testData.createChapter.missingSlug;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 409 for duplicate slug', async () => {
        const { payload, expectedStatus } = testData.createChapter.duplicateSlug;
        chapterServices.createChapter.mockRejectedValue({
          statusCode: 409,
          message: 'Slug already exists'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid slug format', async () => {
        const { payload, expectedStatus } = testData.createChapter.invalidSlug;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for name too long', async () => {
        const { payload, expectedStatus } = testData.createChapter.nameTooLong;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid timezone', async () => {
        const { payload, expectedStatus } = testData.createChapter.invalidTimezone;

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // PUT /api/chapters/updateChapter/:id (Admin Only)
  // ============================================================
  describe('PUT /api/chapters/updateChapter/:id', () => {
    const endpoint = '/api/chapters/updateChapter';

    describe('Success Cases', () => {
      it('should update chapter successfully', async () => {
        const { chapterId, payload, expectedStatus, expectedResponse } = testData.updateChapter.validUpdate;
        chapterServices.updateChapter.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .put(`${endpoint}/${chapterId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body.result.name).toBe(payload.name);
      });

      it('should allow partial update', async () => {
        const { chapterId, payload, expectedStatus } = testData.updateChapter.partialUpdate;
        chapterServices.updateChapter.mockResolvedValue({ id: chapterId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${chapterId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should update chapter status', async () => {
        const { chapterId, payload, expectedStatus } = testData.updateChapter.updateStatus;
        chapterServices.updateChapter.mockResolvedValue({ id: chapterId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${chapterId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should update social links', async () => {
        const { chapterId, payload, expectedStatus } = testData.updateChapter.updateSocialLinks;
        chapterServices.updateChapter.mockResolvedValue({ id: chapterId, ...payload });

        const res = await request(app)
          .put(`${endpoint}/${chapterId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for non-admin users', async () => {
        const { chapterId, payload } = testData.updateChapter.validUpdate;

        const res = await request(app)
          .put(`${endpoint}/${chapterId}`)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const { chapterId, payload } = testData.updateChapter.validUpdate;

        const res = await request(app)
          .put(`${endpoint}/${chapterId}`)
          .send(payload);

        expect(res.status).toBe(401);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent chapter', async () => {
        const { chapterId, payload, expectedStatus } = testData.updateChapter.invalidId;
        chapterServices.updateChapter.mockRejectedValue({
          statusCode: 404,
          message: 'Chapter not found'
        });

        const res = await request(app)
          .put(`${endpoint}/${chapterId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 409 for duplicate slug', async () => {
        const { chapterId, payload, expectedStatus } = testData.updateChapter.duplicateSlug;
        chapterServices.updateChapter.mockRejectedValue({
          statusCode: 409,
          message: 'Slug already exists'
        });

        const res = await request(app)
          .put(`${endpoint}/${chapterId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // DELETE /api/chapters/deleteChapter/:id (Admin Only)
  // ============================================================
  describe('DELETE /api/chapters/deleteChapter/:id', () => {
    const endpoint = '/api/chapters/deleteChapter';

    describe('Success Cases', () => {
      it('should delete chapter successfully', async () => {
        chapterServices.deleteChapter.mockResolvedValue(testData.deleteChapter.expectedResponse);

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteChapter.validId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
      });
    });

    describe('Authorization Errors', () => {
      it('should return 403 for non-admin users', async () => {
        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteChapter.validId}`)
          .set('Authorization', `Bearer ${getUserToken()}`);

        expect(res.status).toBe(403);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteChapter.validId}`);

        expect(res.status).toBe(401);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent chapter', async () => {
        chapterServices.deleteChapter.mockRejectedValue({
          statusCode: 404,
          message: 'Chapter not found'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteChapter.nonExistentId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(404);
      });

      it('should return 400 when chapter has events', async () => {
        chapterServices.deleteChapter.mockRejectedValue({
          statusCode: 400,
          message: 'Cannot delete chapter with events'
        });

        const res = await request(app)
          .delete(`${endpoint}/${testData.deleteChapter.chapterWithEvents}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(400);
      });
    });
  });

  // ============================================================
  // GET /api/chapters/getChapterMembers
  // ============================================================
  describe('GET /api/chapters/getChapterMembers', () => {
    const endpoint = '/api/chapters/getChapterMembers';

    describe('Success Cases', () => {
      it('should return chapter members', async () => {
        chapterServices.getChapterMembers.mockResolvedValue(testData.getChapterMembers.mockData);

        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterMembers.validChapterId}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should return paginated members', async () => {
        chapterServices.getChapterMembers.mockResolvedValue(testData.getChapterMembers.paginatedMockData);

        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterMembers.validChapterId}&page=1&limit=10`);

        expect(res.status).toBe(200);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent chapter', async () => {
        chapterServices.getChapterMembers.mockRejectedValue({
          statusCode: 404,
          message: 'Chapter not found'
        });

        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterMembers.nonExistentChapterId}`);

        expect(res.status).toBe(404);
      });
    });
  });

  // ============================================================
  // POST /api/chapters/joinChapter
  // ============================================================
  describe('POST /api/chapters/joinChapter', () => {
    const endpoint = '/api/chapters/joinChapter';

    describe('Success Cases', () => {
      it('should join chapter successfully', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.joinChapter.validPayload;
        chapterServices.joinChapter.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Error Cases', () => {
      it('should return 409 when already a member', async () => {
        const { payload, expectedStatus } = testData.joinChapter.alreadyMember;
        chapterServices.joinChapter.mockRejectedValue({
          statusCode: 409,
          message: 'Already a member'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 404 for invalid chapter', async () => {
        const { payload, expectedStatus } = testData.joinChapter.invalidChapter;
        chapterServices.joinChapter.mockRejectedValue({
          statusCode: 404,
          message: 'Chapter not found'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 401 without token', async () => {
        const res = await request(app)
          .post(endpoint)
          .send(testData.joinChapter.validPayload.payload);

        expect(res.status).toBe(401);
      });
    });
  });

  // ============================================================
  // POST /api/chapters/leaveChapter
  // ============================================================
  describe('POST /api/chapters/leaveChapter', () => {
    const endpoint = '/api/chapters/leaveChapter';

    describe('Success Cases', () => {
      it('should leave chapter successfully', async () => {
        const { payload, expectedStatus, expectedResponse } = testData.leaveChapter.validPayload;
        chapterServices.leaveChapter.mockResolvedValue(expectedResponse);

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 when not a member', async () => {
        const { payload, expectedStatus } = testData.leaveChapter.notMember;
        chapterServices.leaveChapter.mockRejectedValue({
          statusCode: 404,
          message: 'Not a member'
        });

        const res = await request(app)
          .post(endpoint)
          .set('Authorization', `Bearer ${getUserToken()}`)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 403 when lead tries to leave', async () => {
        const { payload, expectedStatus } = testData.leaveChapter.leadCannotLeave;
        chapterServices.leaveChapter.mockRejectedValue({
          statusCode: 403,
          message: 'Chapter lead cannot leave'
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
  // GET /api/chapters/getChapterEvents
  // ============================================================
  describe('GET /api/chapters/getChapterEvents', () => {
    const endpoint = '/api/chapters/getChapterEvents';

    describe('Success Cases', () => {
      it('should return chapter events', async () => {
        chapterServices.getChapterEvents.mockResolvedValue(testData.getChapterEvents.mockData);

        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterEvents.validChapterId}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
      });

      it('should filter upcoming events', async () => {
        chapterServices.getChapterEvents.mockResolvedValue(testData.getChapterEvents.upcomingEvents.mockData);

        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterEvents.validChapterId}&filter=upcoming`);

        expect(res.status).toBe(200);
      });

      it('should filter past events', async () => {
        chapterServices.getChapterEvents.mockResolvedValue(testData.getChapterEvents.pastEvents.mockData);

        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterEvents.validChapterId}&filter=past`);

        expect(res.status).toBe(200);
      });
    });

    describe('Error Cases', () => {
      it('should return 404 for non-existent chapter', async () => {
        chapterServices.getChapterEvents.mockRejectedValue({
          statusCode: 404,
          message: 'Chapter not found'
        });

        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterEvents.nonExistentChapterId}`);

        expect(res.status).toBe(404);
      });
    });
  });

  // ============================================================
  // GET /api/chapters/getChapterStats
  // ============================================================
  describe('GET /api/chapters/getChapterStats', () => {
    const endpoint = '/api/chapters/getChapterStats';

    describe('Success Cases', () => {
      it('should return chapter statistics', async () => {
        chapterServices.getChapterStats.mockResolvedValue(testData.getChapterStats.mockData);

        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterStats.validChapterId}`)
          .set('Authorization', `Bearer ${getAdminToken()}`);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('total_members');
        expect(res.body.result).toHaveProperty('total_events');
      });
    });

    describe('Authorization Errors', () => {
      it('should return 401 without token', async () => {
        const res = await request(app)
          .get(`${endpoint}?chapter_id=${testData.getChapterStats.validChapterId}`);

        expect(res.status).toBe(401);
      });
    });
  });
});
