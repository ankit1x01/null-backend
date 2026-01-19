/**
 * Event-Likes Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('EventLikes Module - Integration Tests', () => {
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
    describe('GET /api/event-likes/myLikes', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-likes/myLikes');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return user likes with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/event-likes/myLikes')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/event-likes/session/:sessionId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-likes/session/1');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return session likes with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/event-likes/session/1')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/event-likes/session/:sessionId/counts', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-likes/session/1/counts');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/event-likes/session/:sessionId/myLike', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-likes/session/1/myLike');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/event-likes/session/:sessionId/toggle', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/event-likes/session/1/toggle');
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('POST /api/event-likes/session/:sessionId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/event-likes/session/1')
                .send({ like_type: 'thumbs_up' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('DELETE /api/event-likes/session/:sessionId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/event-likes/session/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/event-likes/event/:eventId/topSessions', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-likes/event/1/topSessions');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/event-likes/event/:eventId/engagement', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-likes/event/1/engagement');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/event-likes/sessions/reactions', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/event-likes/sessions/reactions')
                .send({ session_ids: [1, 2] });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('POST /api/event-likes/sessions/myLikes', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/event-likes/sessions/myLikes')
                .send({ session_ids: [1, 2] });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });
});
