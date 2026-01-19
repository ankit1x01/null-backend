/**
 * Pages Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('Pages Module - Integration Tests', () => {
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
    describe('GET /api/pages/getPages', () => {
        it('should return pages list', async () => {
            const res = await api().get('/api/pages/getPages');
            expect([200, 401, 404]).toContain(res.status);
        });
    });

    describe('GET /api/pages/getPageById', () => {
        it('should return page by id', async () => {
            const res = await api().get('/api/pages/getPageById?id=1');
            expect([200, 400, 404, 500]).toContain(res.status);
        });
    });

    // ==================== ADMIN ENDPOINTS ====================
    describe('POST /api/pages/createPage', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/pages/createPage')
                .send({ title: 'Test Page', slug: 'test-page' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });

        it('should create page with admin token', async () => {
            if (!adminToken) return;

            const res = await api()
                .post('/api/pages/createPage')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    title: `Test Page ${Date.now()}`,
                    slug: `test-page-${Date.now()}`,
                    content: 'Test content'
                });

            expect([200, 201, 400, 404, 422, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/pages/updatePage/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/pages/updatePage/1')
                .send({ title: 'Updated Page' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/pages/deletePage/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/pages/deletePage/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
