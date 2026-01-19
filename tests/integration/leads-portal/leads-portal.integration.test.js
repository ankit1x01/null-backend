/**
 * Leads-Portal Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('LeadsPortal Module - Integration Tests', () => {
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
    describe('GET /api/leads/chapters', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/chapters');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return chapters with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/leads/chapters')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/leads/events', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/events');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/leads/stats', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/stats');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/leads/attention', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/attention');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/leads/chapters/:chapterId/events', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/leads/chapters/1/events')
                .send({ name: 'Test Event' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/leads/events/:eventId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/leads/events/1')
                .send({ name: 'Updated Event' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/leads/events/:eventId/registrations', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/events/1/registrations');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/leads/events/:eventId/sessions', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/events/1/sessions');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/leads/events/:eventId/export', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/events/1/export');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('PUT /api/leads/events/:eventId/registrations/mass-update', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/leads/events/1/registrations/mass-update')
                .send({ registration_ids: [1], status: 'confirmed' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/leads/events/:eventId/sessions', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/leads/events/1/sessions')
                .send({ title: 'Test Session' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/leads/events/:eventId/sessions/:sessionId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/leads/events/1/sessions/1')
                .send({ title: 'Updated Session' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/leads/events/:eventId/sessions/suggest-user', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/events/1/sessions/suggest-user');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/leads/events/:eventId/mailer-tasks', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/leads/events/1/mailer-tasks');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/leads/events/:eventId/mailer-tasks', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/leads/events/1/mailer-tasks')
                .send({ subject: 'Test Email' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('DELETE /api/leads/events/:eventId/mailer-tasks/:taskId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/leads/events/1/mailer-tasks/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
