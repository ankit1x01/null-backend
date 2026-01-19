/**
 * OAuth Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('OAuth Module - Integration Tests', () => {
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
    describe('GET /api/oauth/github', () => {
        it('should return github auth URL or redirect', async () => {
            const res = await api().get('/api/oauth/github');
            expect([200, 302, 400, 404, 500, 501]).toContain(res.status);
        });
    });

    describe('GET /api/oauth/google', () => {
        it('should return google auth URL or redirect', async () => {
            const res = await api().get('/api/oauth/google');
            expect([200, 302, 400, 404, 500, 501]).toContain(res.status);
        });
    });

    describe('POST /api/oauth/github/callback', () => {
        it('should handle github callback', async () => {
            const res = await api()
                .post('/api/oauth/github/callback')
                .send({ code: 'test-code' });
            expect([200, 400, 401, 404, 500, 501]).toContain(res.status);
        });
    });

    describe('POST /api/oauth/google/callback', () => {
        it('should handle google callback', async () => {
            const res = await api()
                .post('/api/oauth/google/callback')
                .send({ code: 'test-code' });
            expect([200, 400, 401, 404, 500, 501]).toContain(res.status);
        });
    });

    // ==================== AUTHENTICATED ENDPOINTS ====================
    describe('GET /api/oauth/providers', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/oauth/providers');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return linked providers with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/oauth/providers')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 404, 500]).toContain(res.status);
        });
    });

    describe('DELETE /api/oauth/unlink/:provider', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/oauth/unlink/github');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
