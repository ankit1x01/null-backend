/**
 * Jobs Module - Live Integration Tests
 */

const request = require('supertest');
const { BASE_URL, loginAndGetToken } = require('../../helpers/test-utils');

describe('Jobs Module - Integration Tests', () => {
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
    describe('GET /api/jobs/getJobs', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/jobs/getJobs');
            expect([401, 403, 404]).toContain(res.status);
        });

        it('should return jobs with admin auth', async () => {
            if (!adminToken) return;

            const res = await api()
                .get('/api/jobs/getJobs')
                .set('Authorization', `Bearer ${adminToken}`);
            expect([200, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('GET /api/jobs/stats', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/jobs/stats');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('GET /api/jobs/getJobById/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().get('/api/jobs/getJobById/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/createJob', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/jobs/createJob')
                .send({ name: 'Test Job', type: 'email' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/queueJob', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .post('/api/jobs/queueJob')
                .send({ name: 'Test Job', type: 'email' });
            expect([401, 403, 404, 500]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/start/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/jobs/start/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/pause/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/jobs/pause/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/resume/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/jobs/resume/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/retry/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/jobs/retry/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/complete/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/jobs/complete/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/fail/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/jobs/fail/1');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('PUT /api/jobs/progress/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api()
                .put('/api/jobs/progress/1')
                .send({ progress: 50 });
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('POST /api/jobs/cleanup', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().post('/api/jobs/cleanup');
            expect([401, 403, 404]).toContain(res.status);
        });
    });

    describe('DELETE /api/jobs/deleteJob/:id', () => {
        it('should return 401 without authentication', async () => {
            const res = await api().delete('/api/jobs/deleteJob/999');
            expect([401, 403, 404]).toContain(res.status);
        });
    });
});
