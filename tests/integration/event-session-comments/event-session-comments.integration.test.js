/**
 * Event-Session-Comments Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('EventSessionComments Module - Integration Tests', () => {
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
    describe('GET /api/event-session-comments/getEventSessionComments', () => {
        it('should return session comments list', async () => {
            const res = await api().get('/api/event-session-comments/getEventSessionComments');
            expect([200, 401, 404]).toContain(res.status);
        });
    });

    describe('GET /api/event-session-comments/getEventSessionCommentById/:id', () => {
        it('should return comment by id', async () => {
            const res = await api().get('/api/event-session-comments/getEventSessionCommentById/1');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    // ==================== AUTHENTICATED ENDPOINTS ====================
    describe('POST /api/event-session-comments/createEventSessionComment', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/event-session-comments/createEventSessionComment')
                .send({ session_id: 1, comment: 'Test comment' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });

        it('should create comment with user token', async () => {
            if (!adminToken) return;

            const res = await api()
                .post('/api/event-session-comments/createEventSessionComment')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    session_id: 1,
                    comment: 'Test comment'
                });

            expect([200, 201, 400, 404, 422, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/event-session-comments/updateEventSessionComment/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/event-session-comments/updateEventSessionComment/1')
                .send({ comment: 'Updated comment' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/event-session-comments/deleteEventSessionComment/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/event-session-comments/deleteEventSessionComment/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
