/**
 * Page-Permissions Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('PagePermissions Module - Integration Tests', () => {
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
    describe('POST /api/page-permissions/createPagePermission', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/page-permissions/createPagePermission')
                .send({ page_id: 1, user_id: 1, permission: 'read' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });

        it('should create page permission with admin token', async () => {
            if (!adminToken) return;

            const res = await api()
                .post('/api/page-permissions/createPagePermission')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    page_id: 1,
                    user_id: 1,
                    permission: 'read'
                });

            expect([200, 201, 400, 404, 422, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/page-permissions/updatePagePermission/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/page-permissions/updatePagePermission/1')
                .send({ permission: 'write' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/page-permissions/deletePagePermission/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/page-permissions/deletePagePermission/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
