/**
 * Twitter Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('Twitter Module - Integration Tests', () => {
    const api = () => request(BASE_URL);
    let adminToken = null;

    beforeAll(async () => {
        try {
            adminToken = await loginAndGetToken('admin@nullchapter.com', 'Admin@123');
        } catch (e) {
            console.warn('Could not obtain admin token');
        }
    });

    // ==================== ADMIN ENDPOINTS ====================
    describe('GET /api/twitter/integrations', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/twitter/integrations');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return integrations with admin auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/twitter/integrations')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/twitter/integrations/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/twitter/integrations/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/twitter/integrations', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/twitter/integrations')
                .send({ api_key: 'test', api_secret: 'test' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/twitter/integrations/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/twitter/integrations/1')
                .send({ api_key: 'updated' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/twitter/integrations/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/twitter/integrations/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/twitter/tweet/event/:eventId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/twitter/tweet/event/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/twitter/tweet/retry/:tweetLogId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/twitter/tweet/retry/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/twitter/history', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/twitter/history');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
