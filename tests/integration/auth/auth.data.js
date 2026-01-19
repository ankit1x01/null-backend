/**
 * Auth Module - Test Data
 * Payloads and expected responses for auth API tests
 */

module.exports = {
  // ==================== LOGIN ====================
  login: {
    // Valid scenarios
    validCredentials: {
      payload: {
        email: 'user@example.com',
        password: 'SecurePass123!'
      },
      expectedResponse: {
        code: 'AUTH0001',
        message: 'Login successful'
      }
    },

    adminCredentials: {
      payload: {
        email: 'admin@nullchapter.com',
        password: 'AdminPass123!'
      },
      expectedResponse: {
        code: 'AUTH0001',
        message: 'Login successful'
      }
    },

    // Invalid scenarios
    invalidEmail: {
      payload: {
        email: 'nonexistent@example.com',
        password: 'password123'
      },
      expectedStatus: 401,
      expectedCode: 'AUTH0002'
    },

    invalidPassword: {
      payload: {
        email: 'user@example.com',
        password: 'wrongpassword'
      },
      expectedStatus: 401,
      expectedCode: 'AUTH0002'
    },

    missingEmail: {
      payload: {
        password: 'password123'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    missingPassword: {
      payload: {
        email: 'user@example.com'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    emptyPayload: {
      payload: {},
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    invalidEmailFormat: {
      payload: {
        email: 'invalid-email-format',
        password: 'password123'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    lockedAccount: {
      payload: {
        email: 'locked@example.com',
        password: 'password123'
      },
      expectedStatus: 403,
      expectedCode: 'AUTH0003'
    },

    unconfirmedEmail: {
      payload: {
        email: 'unconfirmed@example.com',
        password: 'password123'
      },
      expectedStatus: 403,
      expectedCode: 'AUTH0004'
    }
  },

  // ==================== REGISTER ====================
  register: {
    // Valid scenarios
    validRegistration: {
      payload: {
        email: 'newuser@example.com',
        password: 'NewUserPass123!',
        name: 'New User',
        handle: 'newuser'
      },
      expectedResponse: {
        code: 'AUTH0005',
        message: 'Registration successful'
      }
    },

    minimalRegistration: {
      payload: {
        email: 'minimal@example.com',
        password: 'MinimalPass123!',
        name: 'Minimal User'
      },
      expectedResponse: {
        code: 'AUTH0005',
        message: 'Registration successful'
      }
    },

    // Invalid scenarios
    existingEmail: {
      payload: {
        email: 'user@example.com',
        password: 'Password123!',
        name: 'Duplicate User'
      },
      expectedStatus: 409,
      expectedCode: 'AUTH0006'
    },

    existingHandle: {
      payload: {
        email: 'newhandle@example.com',
        password: 'Password123!',
        name: 'New Handle User',
        handle: 'johndoe' // Already exists
      },
      expectedStatus: 409,
      expectedCode: 'AUTH0007'
    },

    weakPassword: {
      payload: {
        email: 'weak@example.com',
        password: '123',
        name: 'Weak Password'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0002'
    },

    missingEmail: {
      payload: {
        password: 'Password123!',
        name: 'Missing Email'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    missingPassword: {
      payload: {
        email: 'missing@example.com',
        name: 'Missing Password'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    missingName: {
      payload: {
        email: 'missing@example.com',
        password: 'Password123!'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    invalidEmailFormat: {
      payload: {
        email: 'not-an-email',
        password: 'Password123!',
        name: 'Invalid Email'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    longName: {
      payload: {
        email: 'longname@example.com',
        password: 'Password123!',
        name: 'A'.repeat(300) // Too long
      },
      expectedStatus: 400,
      expectedCode: 'VAL0003'
    }
  },

  // ==================== FORGOT PASSWORD ====================
  forgotPassword: {
    validEmail: {
      payload: {
        email: 'user@example.com'
      },
      expectedResponse: {
        code: 'AUTH0008',
        message: 'Password reset email sent'
      }
    },

    nonExistentEmail: {
      payload: {
        email: 'nonexistent@example.com'
      },
      // Should still return success to prevent email enumeration
      expectedResponse: {
        code: 'AUTH0008',
        message: 'Password reset email sent'
      }
    },

    invalidEmailFormat: {
      payload: {
        email: 'invalid-email'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    missingEmail: {
      payload: {},
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    }
  },

  // ==================== RESET PASSWORD ====================
  resetPassword: {
    validReset: {
      payload: {
        token: 'valid-reset-token-12345',
        password: 'NewSecurePass123!'
      },
      expectedResponse: {
        code: 'AUTH0009',
        message: 'Password reset successful'
      }
    },

    invalidToken: {
      payload: {
        token: 'invalid-token',
        password: 'NewSecurePass123!'
      },
      expectedStatus: 400,
      expectedCode: 'AUTH0010'
    },

    expiredToken: {
      payload: {
        token: 'expired-token',
        password: 'NewSecurePass123!'
      },
      expectedStatus: 400,
      expectedCode: 'AUTH0011'
    },

    weakNewPassword: {
      payload: {
        token: 'valid-reset-token-12345',
        password: '123'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0002'
    },

    missingToken: {
      payload: {
        password: 'NewSecurePass123!'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    missingPassword: {
      payload: {
        token: 'valid-reset-token-12345'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    }
  },

  // ==================== CONFIRM EMAIL ====================
  confirmEmail: {
    validToken: {
      payload: {
        token: 'valid-confirmation-token'
      },
      expectedResponse: {
        code: 'AUTH0012',
        message: 'Email confirmed successfully'
      }
    },

    invalidToken: {
      payload: {
        token: 'invalid-token'
      },
      expectedStatus: 400,
      expectedCode: 'AUTH0013'
    },

    expiredToken: {
      payload: {
        token: 'expired-confirmation-token'
      },
      expectedStatus: 400,
      expectedCode: 'AUTH0014'
    },

    alreadyConfirmed: {
      payload: {
        token: 'already-used-token'
      },
      expectedStatus: 400,
      expectedCode: 'AUTH0015'
    }
  },

  // ==================== RESEND CONFIRMATION ====================
  resendConfirmation: {
    validRequest: {
      payload: {
        email: 'unconfirmed@example.com'
      },
      expectedResponse: {
        code: 'AUTH0016',
        message: 'Confirmation email resent'
      }
    },

    alreadyConfirmed: {
      payload: {
        email: 'user@example.com'
      },
      expectedStatus: 400,
      expectedCode: 'AUTH0017'
    },

    nonExistentEmail: {
      payload: {
        email: 'nonexistent@example.com'
      },
      expectedStatus: 404,
      expectedCode: 'AUTH0018'
    }
  },

  // ==================== MOCK SERVICE RESPONSES ====================
  mockResponses: {
    loginSuccess: {
      user: {
        id: 2,
        email: 'user@example.com',
        name: 'John Doe',
        admin: false
      },
      token: 'mock-jwt-token-12345'
    },

    loginAdminSuccess: {
      user: {
        id: 1,
        email: 'admin@nullchapter.com',
        name: 'Admin User',
        admin: true
      },
      token: 'mock-admin-jwt-token-12345'
    },

    registerSuccess: {
      user: {
        id: 100,
        email: 'newuser@example.com',
        name: 'New User'
      },
      message: 'Please check your email to confirm your account'
    }
  }
};
