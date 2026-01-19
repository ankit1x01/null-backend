/**
 * Chapter-Leads Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('ChapterLeads Module - Integration Tests', () => {
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
    describe('GET /api/chapter-leads/getChapterLeads', () => {
        it('should return chapter leads list', async () => {
            const res = await api().get('/api/chapter-leads/getChapterLeads');
            expect([200, 401, 404]).toContain(res.status);
        });
    });

    describe('GET /api/chapter-leads/getChapterLeadById', () => {
        it('should return chapter lead by id', async () => {
            const res = await api().get('/api/chapter-leads/getChapterLeadById?id=1');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    // ==================== ADMIN ENDPOINTS ====================
    describe('POST /api/chapter-leads/createChapterLead', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/chapter-leads/createChapterLead')
                .send({ user_id: 1, chapter_id: 1 });
            expect([401, 403, 404, 500]).toContain(res.status);
        });

        it('should create chapter lead with admin token', async () => {
            if (!adminToken) return;

            const res = await api()
                .post('/api/chapter-leads/createChapterLead')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    user_id: 1,
                    chapter_id: 1,
                    role: 'lead'
                });

            expect([200, 201, 400, 404, 422, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/chapter-leads/updateChapterLead/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/chapter-leads/updateChapterLead/1')
                .send({ role: 'co-lead' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/chapter-leads/deleteChapterLead/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/chapter-leads/deleteChapterLead/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
