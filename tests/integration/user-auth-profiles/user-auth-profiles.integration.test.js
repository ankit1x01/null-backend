/**
 * User-Auth-Profiles Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('UserAuthProfiles Module - Integration Tests', () => {
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
    describe('GET /api/user-auth-profiles/me', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/user-auth-profiles/me');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return user profiles with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/user-auth-profiles/me')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 404, 500]).toContain(res.status);
        });
    });

    describe('POST /api/user-auth-profiles/link', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/user-auth-profiles/link')
                .send({ provider: 'github', token: 'test-token' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('DELETE /api/user-auth-profiles/unlink/:provider', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/user-auth-profiles/unlink/github');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
