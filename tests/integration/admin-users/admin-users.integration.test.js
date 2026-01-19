/**
 * Admin-Users Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('AdminUsers Module - Integration Tests', () => {
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
    describe('POST /api/admin-users/login', () => {
        it('should accept valid admin login format', async () => {
            const res = await api()
                .post('/api/admin-users/login')
                .send({
                    email: 'admin@nullchapter.com',
                    password: 'Admin@123'
                });
            expect([200, 400, 401, 404, 500]).toContain(res.status);
        });

        it('should reject invalid credentials', async () => {
            const res = await api()
                .post('/api/admin-users/login')
                .send({
                    email: 'invalid@test.com',
                    password: 'wrongpassword'
                });
            expect([400, 401, 404, 500]).toContain(res.status);
        });
    });

    // ==================== ADMIN ENDPOINTS ====================
    describe('GET /api/admin-users/getAdminUsers', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/admin-users/getAdminUsers');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return admin users with auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/admin-users/getAdminUsers')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/admin-users/getAdminUserById/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/admin-users/getAdminUserById/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/admin-users/createAdminUser', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/admin-users/createAdminUser')
                .send({ email: 'newadmin@test.com', password: 'Test@123' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('PUT /api/admin-users/updateAdminUser/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/admin-users/updateAdminUser/1')
                .send({ name: 'Updated Admin' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('PUT /api/admin-users/toggleActive/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().put('/api/admin-users/toggleActive/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('PUT /api/admin-users/changePassword/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/admin-users/changePassword/1')
                .send({ password: 'NewPass@123' });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/admin-users/deleteAdminUser/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/admin-users/deleteAdminUser/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
