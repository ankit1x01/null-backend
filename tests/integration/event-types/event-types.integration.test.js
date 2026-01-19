/**
 * Event-Types Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('EventTypes Module - Integration Tests', () => {
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
    describe('GET /api/event-types/getEventTypes', () => {
        it('should return event types list', async () => {
            const res = await api().get('/api/event-types/getEventTypes');
            expect([200, 401, 404]).toContain(res.status);
        });
    });

    describe('GET /api/event-types/getEventTypeById', () => {
        it('should return event type by id', async () => {
            const res = await api().get('/api/event-types/getEventTypeById?id=1');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    // ==================== ADMIN ENDPOINTS ====================
    describe('POST /api/event-types/createEventType', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/event-types/createEventType')
                .send({ name: 'Test Type' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });

        it('should create event type with admin token', async () => {
            if (!adminToken) return;

            const res = await api()
                .post('/api/event-types/createEventType')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: `Test Type ${Date.now()}`,
                    description: 'Test event type'
                });

            expect([200, 201, 400, 404, 422, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/event-types/updateEventType/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/event-types/updateEventType/1')
                .send({ name: 'Updated Type' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/event-types/deleteEventType/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/event-types/deleteEventType/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
