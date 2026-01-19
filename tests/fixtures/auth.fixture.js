/**
 * Auth Fixture Data
 * Authentication mock data for testing
 */

module.exports = {
  // Valid credentials
  validCredentials: {
    email: 'user@example.com',
    password: 'SecurePass123!'
  },

  adminCredentials: {
    email: 'admin@nullchapter.com',
    password: 'AdminPass123!'
  },

  // Invalid credentials scenarios
  invalidEmail: {
    email: 'nonexistent@example.com',
    password: 'password123'
  },

  invalidPassword: {
    email: 'user@example.com',
    password: 'wrongpassword'
  },

  // Registration payloads
  validRegistration: {
    email: 'newuser@example.com',
    password: 'NewUserPass123!',
    name: 'New User',
    handle: 'newuser'
  },

  registrationWithExistingEmail: {
    email: 'user@example.com',
    password: 'Password123!',
    name: 'Duplicate User',
    handle: 'duplicate'
  },

  registrationWithWeakPassword: {
    email: 'weak@example.com',
    password: '123',
    name: 'Weak Password User',
    handle: 'weakpass'
  },

  registrationMissingFields: {
    email: 'missing@example.com'
    // missing password and name
  },

  registrationInvalidEmail: {
    email: 'invalid-email',
    password: 'Password123!',
    name: 'Invalid Email User',
    handle: 'invalidemail'
  },

  // Password reset
  forgotPasswordValid: {
    email: 'user@example.com'
  },

  forgotPasswordInvalid: {
    email: 'nonexistent@example.com'
  },

  resetPasswordValid: {
    token: 'valid-reset-token',
    password: 'NewSecurePass123!'
  },

  resetPasswordInvalidToken: {
    token: 'invalid-token',
    password: 'NewSecurePass123!'
  },

  resetPasswordExpiredToken: {
    token: 'expired-token',
    password: 'NewSecurePass123!'
  },

  // Token responses
  mockTokenResponse: {
    user: {
      id: 2,
      email: 'user@example.com',
      name: 'John Doe',
      admin: false
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token'
  },

  mockAdminTokenResponse: {
    user: {
      id: 1,
      email: 'admin@nullchapter.com',
      name: 'Admin User',
      admin: true
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin_token'
  }
};
