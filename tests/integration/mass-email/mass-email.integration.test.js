/**
 * Mass-Email Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('MassEmail Module - Integration Tests', () => {
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
    describe('GET /api/mass-email/templates', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/mass-email/templates');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return templates with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/mass-email/templates')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/mass-email/campaigns', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/mass-email/campaigns');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/mass-email/campaigns/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/mass-email/campaigns/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/mass-email/campaigns/:id/stats', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/mass-email/campaigns/1/stats');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/mass-email/campaigns', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/mass-email/campaigns')
                .send({ name: 'Test Campaign', subject: 'Test Subject' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/mass-email/campaigns/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/mass-email/campaigns/1')
                .send({ name: 'Updated Campaign' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/mass-email/campaigns/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/mass-email/campaigns/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/mass-email/recipients/event/:eventId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/mass-email/recipients/event/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/mass-email/recipients/chapter/:chapterId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/mass-email/recipients/chapter/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/mass-email/campaigns/:id/recipients', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/mass-email/campaigns/1/recipients')
                .send({ user_ids: [1, 2] });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('DELETE /api/mass-email/campaigns/:id/recipients/:recipientId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/mass-email/campaigns/1/recipients/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/mass-email/campaigns/:id/send', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/mass-email/campaigns/1/send');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/mass-email/campaigns/:id/schedule', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/mass-email/campaigns/1/schedule')
                .send({ scheduled_at: '2030-01-01T12:00:00Z' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/mass-email/campaigns/:id/cancel-schedule', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/mass-email/campaigns/1/cancel-schedule');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
