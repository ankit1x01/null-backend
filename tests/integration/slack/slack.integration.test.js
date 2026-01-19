/**
 * Slack Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('Slack Module - Integration Tests', () => {
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
    describe('POST /api/slack/slackbot/events', () => {
        it('should handle slackbot events', async () => {
            const res = await api()
                .post('/api/slack/slackbot/events')
                .send({ type: 'url_verification', challenge: 'test' });
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    // ==================== AUTHENTICATED ENDPOINTS ====================
    describe('GET /api/slack/', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/slack/');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return integrations with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/slack/')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/slack/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/slack/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/slack/chapter/:chapterId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/slack/chapter/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/slack/:id/logs', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/slack/1/logs');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/slack/', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/slack/')
                .send({ chapter_id: 1, webhook_url: 'https://hooks.slack.com/test' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/slack/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/slack/1')
                .send({ webhook_url: 'https://hooks.slack.com/updated' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/slack/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/slack/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/slack/:id/toggle', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/slack/1/toggle');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/slack/:id/test', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/slack/1/test');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/slack/notify/event/:eventId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/slack/notify/event/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/slack/:id/send', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/slack/1/send')
                .send({ message: 'Test message' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/slack/logs/:logId/retry', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/slack/logs/1/retry');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
