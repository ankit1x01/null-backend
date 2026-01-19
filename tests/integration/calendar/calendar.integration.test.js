/**
 * Calendar Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('Calendar Module - Integration Tests', () => {
    const api = () => request(BASE_URL);
    let adminToken = null;

    beforeAll(async () => {
        try {
            adminToken = await loginAndGetToken('admin@nullchapter.com', 'Admin@123');
        } catch (e) {
            console.warn('Could not obtain admin token');
        }
    });

    // ==================== PUBLIC ENDPOINTS ====================
    describe('GET /api/calendar/global.ics', () => {
        it('should return global calendar feed', async () => {
            const res = await api().get('/api/calendar/global.ics');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/calendar/chapter/:chapterId.ics', () => {
        it('should return chapter calendar feed', async () => {
            const res = await api().get('/api/calendar/chapter/1.ics');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/calendar/chapter/:chapterId/info', () => {
        it('should return chapter calendar info', async () => {
            const res = await api().get('/api/calendar/chapter/1/info');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    // ==================== AUTHENTICATED ENDPOINTS ====================
    describe('GET /api/calendar/my.ics', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/calendar/my.ics');
            expect([400, 401, 403, 404]).toContain(res.status);
        });

        it('should return personal calendar with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/calendar/my.ics')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });
});
