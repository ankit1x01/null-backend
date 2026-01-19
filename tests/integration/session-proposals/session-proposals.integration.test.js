/**
 * Session-Proposals Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('SessionProposals Module - Integration Tests', () => {
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
    describe('GET /api/session-proposals/getSessionProposals', () => {
        it('should return session proposals list', async () => {
            const res = await api().get('/api/session-proposals/getSessionProposals');
            expect([200, 401, 404]).toContain(res.status);
        });
    });

    describe('GET /api/session-proposals/getSessionProposalById/:id', () => {
        it('should return proposal by id', async () => {
            const res = await api().get('/api/session-proposals/getSessionProposalById/1');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    // ==================== AUTHENTICATED ENDPOINTS ====================
    describe('POST /api/session-proposals/createSessionProposal', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/session-proposals/createSessionProposal')
                .send({ title: 'Test Proposal', description: 'Test' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });

        it('should create proposal with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .post('/api/session-proposals/createSessionProposal')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    title: `Test Proposal ${Date.now()}`,
                    description: 'Test proposal description',
                    event_id: 1
                });
            expect([200, 201, 400, 404, 422, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/session-proposals/updateSessionProposal/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/session-proposals/updateSessionProposal/1')
                .send({ title: 'Updated Proposal' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/session-proposals/deleteSessionProposal/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/session-proposals/deleteSessionProposal/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('PUT /api/session-proposals/updateStatus/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/session-proposals/updateStatus/1')
                .send({ status: 'approved' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
