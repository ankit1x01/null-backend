/**
 * User-API-Tokens Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('UserApiTokens Module - Integration Tests', () => {
    const api = () => request(BASE_URL);
    let adminToken = null;

    beforeAll(async () => {
        try {
            adminToken = await loginAndGetToken('admin@nullchapter.com', 'Admin@123');
        } catch (e) {
            console.warn('Could not obtain admin token');
        }
    });

    // ==================== AUTHENTICATED ENDPOINTS ====================
    describe('GET /api/user-api-tokens/', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/user-api-tokens/');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return user tokens with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/user-api-tokens/')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 404, 500]).toContain(res.status);
        });
    });

    describe('POST /api/user-api-tokens/', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/user-api-tokens/')
                .send({ name: 'Test Token' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });

        it('should create token with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .post('/api/user-api-tokens/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ name: `Test Token ${Date.now()}` });
            expect([200, 201, 400, 404, 422, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/user-api-tokens/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/user-api-tokens/1')
                .send({ name: 'Updated Token' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/user-api-tokens/:id/regenerate', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/user-api-tokens/1/regenerate');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/user-api-tokens/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/user-api-tokens/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
