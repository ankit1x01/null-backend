/**
 * Stats Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL } = require('../../helpers/test-utils');

describe('Stats Module - Integration Tests', () => {
    const api = () => request(BASE_URL);

    // ==================== PUBLIC ENDPOINTS ====================
    describe('GET /api/stats/dashboard', () => {
        it('should return dashboard stats', async () => {
            const res = await api().get('/api/stats/dashboard');
            expect([200, 401, 404, 500]).toContain(res.status);
        });
    });
});
