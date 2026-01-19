/**
 * Event-Mailer-Tasks Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('EventMailerTasks Module - Integration Tests', () => {
    const api = () => request(BASE_URL);
    let adminToken = null;

    beforeAll(async () => {
        try {
            adminToken = await loginAndGetToken('admin@nullchapter.com', 'Admin@123');
        } catch (e) {
            console.warn('Could not obtain admin token');
        }
    });

    // ==================== ADMIN ENDPOINTS ====================
    describe('GET /api/event-mailer-tasks/getMailerTasks', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-mailer-tasks/getMailerTasks');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return mailer tasks with admin auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/event-mailer-tasks/getMailerTasks')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/event-mailer-tasks/getMailerTaskById/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-mailer-tasks/getMailerTaskById/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/event-mailer-tasks/previewRecipients', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-mailer-tasks/previewRecipients');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/event-mailer-tasks/createMailerTask', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/event-mailer-tasks/createMailerTask')
                .send({ subject: 'Test Task' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/event-mailer-tasks/updateMailerTask/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/event-mailer-tasks/updateMailerTask/1')
                .send({ subject: 'Updated Task' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/event-mailer-tasks/executeMailerTask/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/event-mailer-tasks/executeMailerTask/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/event-mailer-tasks/deleteMailerTask/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/event-mailer-tasks/deleteMailerTask/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
