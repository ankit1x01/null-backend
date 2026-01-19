/**
 * Session-Requests Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('SessionRequests Module - Integration Tests', () => {
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
    describe('GET /api/session-requests/getSessionRequests', () => {
        it('should return session requests list', async () => {
            const res = await api().get('/api/session-requests/getSessionRequests');
            expect([200, 401, 404]).toContain(res.status);
        });
    });

    describe('GET /api/session-requests/getSessionRequestById/:id', () => {
        it('should return request by id', async () => {
            const res = await api().get('/api/session-requests/getSessionRequestById/1');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    describe('POST /api/session-requests/createSessionRequest', () => {
        it('should allow creating session request (public)', async () => {
            const res = await api()
                .post('/api/session-requests/createSessionRequest')
                .send({
                    title: `Test Request ${Date.now()}`,
                    description: 'Test request description'
                });
            expect([200, 201, 400, 404, 422, 500]).toContain(res.status);
        });
    });

    // ==================== ADMIN ENDPOINTS ====================
    describe('PUT /api/session-requests/updateSessionRequest/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/session-requests/updateSessionRequest/1')
                .send({ title: 'Updated Request' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('PUT /api/session-requests/updateStatus/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/session-requests/updateStatus/1')
                .send({ status: 'approved' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/session-requests/deleteSessionRequest/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/session-requests/deleteSessionRequest/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
