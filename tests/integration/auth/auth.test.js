/**
 * Auth Module - Integration Tests
 * Comprehensive test cases for authentication APIs
 */

const request = require('supertest');
const app = require('../../../src/index');
const authServices = require('../../../src/modules/auth/services');
const testData = require('./auth.data');
const { getAdminToken, getUserToken, expectSuccessResponse, expectErrorResponse } = require('../../helpers/test-utils');

// Mock the auth services
jest.mock('../../../src/modules/auth/services');

describe('Auth Module API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // POST /api/auth/login
  // ============================================================
  describe('POST /api/auth/login', () => {
    const endpoint = '/api/auth/login';

    describe('Success Cases', () => {
      it('should login successfully with valid credentials', async () => {
        const { payload, expectedResponse } = testData.login.validCredentials;
        authServices.login.mockResolvedValue(testData.mockResponses.loginSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload)
          .expect('Content-Type', /json/);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('user');
        expect(res.body.result).toHaveProperty('token');
        expect(res.body.result.user.email).toBe(payload.email);
        expect(authServices.login).toHaveBeenCalledWith(expect.objectContaining({
          email: payload.email,
          password: payload.password
        }));
      });

      it('should login successfully as admin', async () => {
        const { payload } = testData.login.adminCredentials;
        authServices.login.mockResolvedValue(testData.mockResponses.loginAdminSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload)
          .expect('Content-Type', /json/);

        expect(res.status).toBe(200);
        expect(res.body.result.user.admin).toBe(true);
      });

      it('should return JWT token in response', async () => {
        const { payload } = testData.login.validCredentials;
        authServices.login.mockResolvedValue(testData.mockResponses.loginSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
        expect(res.body.result.token).toBeDefined();
        expect(typeof res.body.result.token).toBe('string');
      });

      it('should not include password in response', async () => {
        const { payload } = testData.login.validCredentials;
        authServices.login.mockResolvedValue(testData.mockResponses.loginSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
        expect(res.body.result.user.password).toBeUndefined();
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 when email is missing', async () => {
        const { payload, expectedStatus } = testData.login.missingEmail;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
        expect(res.body).toHaveProperty('message');
      });

      it('should return 400 when password is missing', async () => {
        const { payload, expectedStatus } = testData.login.missingPassword;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 with empty payload', async () => {
        const { payload, expectedStatus } = testData.login.emptyPayload;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid email format', async () => {
        const { payload, expectedStatus } = testData.login.invalidEmailFormat;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Authentication Errors', () => {
      it('should return 401 for non-existent email', async () => {
        const { payload, expectedStatus } = testData.login.invalidEmail;
        authServices.login.mockRejectedValue({
          statusCode: 401,
          message: 'Invalid credentials'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 401 for wrong password', async () => {
        const { payload, expectedStatus } = testData.login.invalidPassword;
        authServices.login.mockRejectedValue({
          statusCode: 401,
          message: 'Invalid credentials'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 403 for locked account', async () => {
        const { payload, expectedStatus } = testData.login.lockedAccount;
        authServices.login.mockRejectedValue({
          statusCode: 403,
          message: 'Account is locked'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 403 for unconfirmed email', async () => {
        const { payload, expectedStatus } = testData.login.unconfirmedEmail;
        authServices.login.mockRejectedValue({
          statusCode: 403,
          message: 'Email not confirmed'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Edge Cases', () => {
      it('should handle case-insensitive email', async () => {
        authServices.login.mockResolvedValue(testData.mockResponses.loginSuccess);

        const res = await request(app)
          .post(endpoint)
          .send({
            email: 'USER@EXAMPLE.COM',
            password: 'SecurePass123!'
          });

        expect(res.status).toBe(200);
      });

      it('should trim whitespace from email', async () => {
        authServices.login.mockResolvedValue(testData.mockResponses.loginSuccess);

        const res = await request(app)
          .post(endpoint)
          .send({
            email: '  user@example.com  ',
            password: 'SecurePass123!'
          });

        expect(res.status).toBe(200);
      });

      it('should handle service errors gracefully', async () => {
        authServices.login.mockRejectedValue(new Error('Database connection failed'));

        const res = await request(app)
          .post(endpoint)
          .send(testData.login.validCredentials.payload);

        expect(res.status).toBe(500);
      });
    });
  });

  // ============================================================
  // POST /api/auth/register
  // ============================================================
  describe('POST /api/auth/register', () => {
    const endpoint = '/api/auth/register';

    describe('Success Cases', () => {
      it('should register new user successfully', async () => {
        const { payload } = testData.register.validRegistration;
        authServices.register.mockResolvedValue(testData.mockResponses.registerSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload)
          .expect('Content-Type', /json/);

        expect(res.status).toBe(200);
        expect(res.body.result).toHaveProperty('user');
        expect(authServices.register).toHaveBeenCalled();
      });

      it('should register with minimal required fields', async () => {
        const { payload } = testData.register.minimalRegistration;
        authServices.register.mockResolvedValue(testData.mockResponses.registerSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
      });

      it('should auto-generate handle if not provided', async () => {
        const payload = {
          email: 'authandle@example.com',
          password: 'Password123!',
          name: 'Auto Handle User'
        };
        authServices.register.mockResolvedValue({
          user: { ...testData.mockResponses.registerSuccess.user, handle: 'auto_handle_user' }
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
      });

      it('should not return password in response', async () => {
        const { payload } = testData.register.validRegistration;
        authServices.register.mockResolvedValue(testData.mockResponses.registerSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
        expect(res.body.result.user.password).toBeUndefined();
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 when email is missing', async () => {
        const { payload, expectedStatus } = testData.register.missingEmail;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 when password is missing', async () => {
        const { payload, expectedStatus } = testData.register.missingPassword;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 when name is missing', async () => {
        const { payload, expectedStatus } = testData.register.missingName;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for invalid email format', async () => {
        const { payload, expectedStatus } = testData.register.invalidEmailFormat;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for weak password', async () => {
        const { payload, expectedStatus } = testData.register.weakPassword;
        authServices.register.mockRejectedValue({
          statusCode: 400,
          message: 'Password too weak'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for excessively long name', async () => {
        const { payload, expectedStatus } = testData.register.longName;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Conflict Errors', () => {
      it('should return 409 for existing email', async () => {
        const { payload, expectedStatus } = testData.register.existingEmail;
        authServices.register.mockRejectedValue({
          statusCode: 409,
          message: 'Email already registered'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 409 for existing handle', async () => {
        const { payload, expectedStatus } = testData.register.existingHandle;
        authServices.register.mockRejectedValue({
          statusCode: 409,
          message: 'Handle already taken'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });

    describe('Edge Cases', () => {
      it('should normalize email to lowercase', async () => {
        const payload = {
          email: 'UPPERCASE@EXAMPLE.COM',
          password: 'Password123!',
          name: 'Uppercase Email'
        };
        authServices.register.mockResolvedValue(testData.mockResponses.registerSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
      });

      it('should trim whitespace from fields', async () => {
        const payload = {
          email: '  spaced@example.com  ',
          password: 'Password123!',
          name: '  Spaced Name  '
        };
        authServices.register.mockResolvedValue(testData.mockResponses.registerSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
      });

      it('should handle special characters in name', async () => {
        const payload = {
          email: 'special@example.com',
          password: 'Password123!',
          name: "O'Connor-Smith Jr."
        };
        authServices.register.mockResolvedValue(testData.mockResponses.registerSuccess);

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
      });
    });
  });

  // ============================================================
  // POST /api/auth/forgot-password
  // ============================================================
  describe('POST /api/auth/forgot-password', () => {
    const endpoint = '/api/auth/forgot-password';

    describe('Success Cases', () => {
      it('should send password reset email for valid email', async () => {
        const { payload } = testData.forgotPassword.validEmail;
        authServices.forgotPassword.mockResolvedValue({ message: 'Email sent' });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
        expect(authServices.forgotPassword).toHaveBeenCalledWith(expect.objectContaining({
          email: payload.email
        }));
      });

      it('should return success even for non-existent email (security)', async () => {
        const { payload } = testData.forgotPassword.nonExistentEmail;
        authServices.forgotPassword.mockResolvedValue({ message: 'Email sent' });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        // Should not reveal if email exists
        expect(res.status).toBe(200);
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for invalid email format', async () => {
        const { payload, expectedStatus } = testData.forgotPassword.invalidEmailFormat;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 when email is missing', async () => {
        const { payload, expectedStatus } = testData.forgotPassword.missingEmail;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // POST /api/auth/reset-password
  // ============================================================
  describe('POST /api/auth/reset-password', () => {
    const endpoint = '/api/auth/reset-password';

    describe('Success Cases', () => {
      it('should reset password with valid token', async () => {
        const { payload } = testData.resetPassword.validReset;
        authServices.resetPassword.mockResolvedValue({ message: 'Password reset successful' });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
        expect(authServices.resetPassword).toHaveBeenCalled();
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 for invalid token', async () => {
        const { payload, expectedStatus } = testData.resetPassword.invalidToken;
        authServices.resetPassword.mockRejectedValue({
          statusCode: 400,
          message: 'Invalid token'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for expired token', async () => {
        const { payload, expectedStatus } = testData.resetPassword.expiredToken;
        authServices.resetPassword.mockRejectedValue({
          statusCode: 400,
          message: 'Token expired'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for weak new password', async () => {
        const { payload, expectedStatus } = testData.resetPassword.weakNewPassword;
        authServices.resetPassword.mockRejectedValue({
          statusCode: 400,
          message: 'Password too weak'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 when token is missing', async () => {
        const { payload, expectedStatus } = testData.resetPassword.missingToken;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 when password is missing', async () => {
        const { payload, expectedStatus } = testData.resetPassword.missingPassword;

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // POST /api/auth/confirm-email
  // ============================================================
  describe('POST /api/auth/confirm-email', () => {
    const endpoint = '/api/auth/confirm-email';

    describe('Success Cases', () => {
      it('should confirm email with valid token', async () => {
        const { payload } = testData.confirmEmail.validToken;
        authServices.confirmEmail.mockResolvedValue({ message: 'Email confirmed' });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
      });
    });

    describe('Error Cases', () => {
      it('should return 400 for invalid token', async () => {
        const { payload, expectedStatus } = testData.confirmEmail.invalidToken;
        authServices.confirmEmail.mockRejectedValue({
          statusCode: 400,
          message: 'Invalid token'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 for expired token', async () => {
        const { payload, expectedStatus } = testData.confirmEmail.expiredToken;
        authServices.confirmEmail.mockRejectedValue({
          statusCode: 400,
          message: 'Token expired'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 400 if email already confirmed', async () => {
        const { payload, expectedStatus } = testData.confirmEmail.alreadyConfirmed;
        authServices.confirmEmail.mockRejectedValue({
          statusCode: 400,
          message: 'Email already confirmed'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });

  // ============================================================
  // POST /api/auth/resend-confirmation
  // ============================================================
  describe('POST /api/auth/resend-confirmation', () => {
    const endpoint = '/api/auth/resend-confirmation';

    describe('Success Cases', () => {
      it('should resend confirmation email', async () => {
        const { payload } = testData.resendConfirmation.validRequest;
        authServices.resendConfirmation.mockResolvedValue({ message: 'Email sent' });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(200);
      });
    });

    describe('Error Cases', () => {
      it('should return 400 if email already confirmed', async () => {
        const { payload, expectedStatus } = testData.resendConfirmation.alreadyConfirmed;
        authServices.resendConfirmation.mockRejectedValue({
          statusCode: 400,
          message: 'Email already confirmed'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });

      it('should return 404 for non-existent email', async () => {
        const { payload, expectedStatus } = testData.resendConfirmation.nonExistentEmail;
        authServices.resendConfirmation.mockRejectedValue({
          statusCode: 404,
          message: 'User not found'
        });

        const res = await request(app)
          .post(endpoint)
          .send(payload);

        expect(res.status).toBe(expectedStatus);
      });
    });
  });
});
