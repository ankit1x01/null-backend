const request = require('supertest');
const userServices = require('../../src/modules/users/services');

// Mock services
jest.mock('../../src/modules/users/services');

// Mock JWT middleware
jest.mock('../../src/shared/middlewares/jwt.middleware', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 1, email: 'test@example.com', role: 'admin' };
    next();
  },
  optionalAuth: (req, res, next) => {
    req.user = { id: 1, email: 'test@example.com', role: 'admin' };
    next();
  }
}));

// Import app AFTER mocks
const app = require('../../src/index');

describe('Users API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users/me', () => {
    it('should return current user profile', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      userServices.getMe.mockResolvedValue(mockUser);

      const res = await request(app)
        .get('/api/users/me')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockUser);
      expect(userServices.getMe).toHaveBeenCalled();
    });
  });

  describe('GET /api/users/getUsers', () => {
    it('should return list of users', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' }
      ];
      userServices.getUsers.mockResolvedValue(mockUsers);

      const res = await request(app)
        .get('/api/users/getUsers')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockUsers);
      expect(userServices.getUsers).toHaveBeenCalled();
    });
  });

  describe('GET /api/users/getUserById', () => {
    it('should return a user by ID', async () => {
      const mockUser = { id: 2, name: 'User 2' };
      userServices.getUserById.mockResolvedValue(mockUser);

      const res = await request(app)
        .get('/api/users/getUserById')
        .query({ userId: 2 })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockUser);
      expect(userServices.getUserById).toHaveBeenCalledWith(expect.objectContaining({ userId: '2' }));
    });
  });

  describe('PUT /api/users/updateUser/:id', () => {
    it('should update a user', async () => {
      const mockResult = { id: 1, name: 'Updated Name' };
      userServices.updateUser.mockResolvedValue(mockResult);

      const res = await request(app)
        .put('/api/users/updateUser/1')
        .send({ name: 'Updated Name' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      expect(userServices.updateUser).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/users/deleteUser/:id', () => {
    it('should delete a user', async () => {
      const mockResult = { success: true };
      userServices.deleteUser.mockResolvedValue(mockResult);

      const res = await request(app)
        .delete('/api/users/deleteUser/1')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      expect(userServices.deleteUser).toHaveBeenCalled();
    });
  });

  describe('GET /api/users/events', () => {
    it('should return user events', async () => {
      const mockEvents = [{ id: 1, title: 'Event 1' }];
      userServices.getUserEvents.mockResolvedValue(mockEvents);

      const res = await request(app)
        .get('/api/users/events')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockEvents);
      expect(userServices.getUserEvents).toHaveBeenCalled();
    });
  });

  describe('GET /api/users/sessions', () => {
    it('should return user sessions', async () => {
      const mockSessions = [{ id: 1, title: 'Session 1' }];
      userServices.getUserSessions.mockResolvedValue(mockSessions);

      const res = await request(app)
        .get('/api/users/sessions')
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockSessions);
      expect(userServices.getUserSessions).toHaveBeenCalled();
    });
  });
});
