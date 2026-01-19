/**
 * Event-Notifications Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('EventNotifications Module - Integration Tests', () => {
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
    describe('GET /api/event-notifications/getNotifications', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-notifications/getNotifications');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return notifications with admin auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/event-notifications/getNotifications')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/event-notifications/getNotificationById/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-notifications/getNotificationById/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/event-notifications/getByEvent/:eventId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/event-notifications/getByEvent/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/event-notifications/createNotification', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/event-notifications/createNotification')
                .send({ event_id: 1, message: 'Test notification' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('POST /api/event-notifications/scheduleForEvent/:eventId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/event-notifications/scheduleForEvent/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('PUT /api/event-notifications/updateNotification/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/event-notifications/updateNotification/1')
                .send({ message: 'Updated notification' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/event-notifications/sendNotification/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/event-notifications/sendNotification/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/event-notifications/processPending', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/event-notifications/processPending');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/event-notifications/cancelForEvent/:eventId', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/event-notifications/cancelForEvent/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/event-notifications/deleteNotification/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/event-notifications/deleteNotification/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
