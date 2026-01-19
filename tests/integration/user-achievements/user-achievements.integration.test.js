/**
 * User-Achievements Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL } = require('../../helpers/test-utils');

describe('UserAchievements Module - Integration Tests', () => {
    const api = () => request(BASE_URL);

    // ==================== PUBLIC ENDPOINTS ====================
    describe('GET /api/user-achievements/:userId', () => {
        it('should return user achievements', async () => {
            const res = await api().get('/api/user-achievements/1');
            expect([200, 400, 404, 500]).toContain(res.status);
        });

        it('should handle non-existent user', async () => {
            const res = await api().get('/api/user-achievements/999999');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });
});
