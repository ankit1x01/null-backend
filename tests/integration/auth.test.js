const request = require('supertest');
const app = require('../../src/index');
const authServices = require('../../src/modules/auth/services');

// Mock services
jest.mock('../../src/modules/auth/services');

describe('Auth API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully', async () => {
      const mockResult = { 
        user: { id: 1, email: 'test@example.com' },
        token: 'mock_token'
      };
      authServices.login.mockResolvedValue(mockResult);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      expect(authServices.login).toHaveBeenCalledWith(expect.objectContaining({ 
        email: 'test@example.com', 
        password: 'password' 
      }));
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register successfully', async () => {
      const mockResult = { 
        user: { id: 1, email: 'test@example.com' }
      };
      authServices.register.mockResolvedValue(mockResult);

      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: 'password', name: 'Test' })
        .expect('Content-Type', /json/);

      expect(res.status).toBe(200);
      expect(res.body.result).toEqual(mockResult);
      expect(authServices.register).toHaveBeenCalled();
    });
  });
});
