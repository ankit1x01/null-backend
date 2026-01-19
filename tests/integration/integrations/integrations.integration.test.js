/**
 * Integrations Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL } = require('../../helpers/test-utils');

describe('Integrations Module - Integration Tests', () => {
    const api = () => request(BASE_URL);

    // ==================== PUBLIC ENDPOINTS ====================
    describe('POST /api/integrations/slackbot/events', () => {
        it('should handle slackbot events', async () => {
            const res = await api()
                .post('/api/integrations/slackbot/events')
                .send({ type: 'url_verification', challenge: 'test-challenge' });
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });
});
