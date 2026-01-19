/**
 * Users Module - Test Data
 * Payloads and expected responses for users API tests
 */

module.exports = {
  // ==================== GET USERS (Admin) ====================
  getUsers: {
    successResponse: {
      code: 'USER0001',
      message: 'Users retrieved successfully'
    },
    mockData: [
      { id: 1, email: 'admin@example.com', name: 'Admin', admin: true },
      { id: 2, email: 'user@example.com', name: 'User', admin: false },
      { id: 3, email: 'speaker@example.com', name: 'Speaker', admin: false }
    ],
    paginatedMockData: {
      data: [
        { id: 1, email: 'user1@example.com', name: 'User 1' },
        { id: 2, email: 'user2@example.com', name: 'User 2' }
      ],
      total: 50,
      page: 1,
      limit: 10,
      totalPages: 5
    }
  },

  // ==================== GET USER BY ID ====================
  getUserById: {
    validId: 2,
    nonExistentId: 99999,
    invalidId: 'invalid',

    mockData: {
      id: 2,
      email: 'user@example.com',
      name: 'John Doe',
      handle: 'johndoe',
      bio: 'Software developer',
      avatar: null,
      admin: false,
      created_at: '2024-01-01T00:00:00.000Z'
    },

    successResponse: {
      code: 'USER0002',
      message: 'User retrieved successfully'
    }
  },

  // ==================== GET ME (Current User) ====================
  getMe: {
    mockData: {
      id: 2,
      email: 'user@example.com',
      name: 'John Doe',
      handle: 'johndoe',
      bio: 'Software developer',
      avatar: null,
      admin: false,
      email_confirmed: true
    },
    successResponse: {
      code: 'USER0003',
      message: 'Profile retrieved successfully'
    }
  },

  // ==================== UPDATE USER ====================
  updateUser: {
    // Valid updates
    validUpdate: {
      payload: {
        name: 'John Doe Updated',
        bio: 'Updated bio description',
        handle: 'johndoe_updated'
      },
      expectedCode: 'USER0004'
    },

    partialUpdate: {
      payload: {
        bio: 'Only updating bio'
      },
      expectedCode: 'USER0004'
    },

    updateAvatar: {
      payload: {
        avatar: 'new-avatar.jpg'
      },
      expectedCode: 'USER0004'
    },

    // Invalid updates
    duplicateHandle: {
      payload: {
        handle: 'existinghandle'
      },
      expectedStatus: 409,
      expectedCode: 'USER0005'
    },

    duplicateEmail: {
      payload: {
        email: 'existing@example.com'
      },
      expectedStatus: 409,
      expectedCode: 'USER0006'
    },

    invalidEmail: {
      payload: {
        email: 'not-an-email'
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    emptyName: {
      payload: {
        name: ''
      },
      expectedStatus: 400,
      expectedCode: 'VAL0001'
    },

    longBio: {
      payload: {
        bio: 'A'.repeat(5000) // Too long
      },
      expectedStatus: 400,
      expectedCode: 'VAL0003'
    },

    // Admin-only updates
    adminUpdateRole: {
      payload: {
        admin: true
      },
      expectedStatus: 403, // Non-admin can't change this
      expectedCode: 'USER0007'
    }
  },

  // ==================== DELETE USER ====================
  deleteUser: {
    validId: 5,
    nonExistentId: 99999,
    adminId: 1, // Can't delete admin

    successResponse: {
      code: 'USER0008',
      message: 'User deleted successfully'
    },

    cannotDeleteAdmin: {
      expectedStatus: 403,
      expectedCode: 'USER0009'
    },

    cannotDeleteSelf: {
      expectedStatus: 403,
      expectedCode: 'USER0010'
    }
  },

  // ==================== GET USER EVENTS ====================
  getUserEvents: {
    mockData: [
      { id: 1, name: 'Event 1', chapter_id: 1, start_time: '2026-02-01' },
      { id: 2, name: 'Event 2', chapter_id: 1, start_time: '2026-03-01' }
    ],
    successResponse: {
      code: 'USER0011',
      message: 'User events retrieved successfully'
    }
  },

  // ==================== GET USER SESSIONS ====================
  getUserSessions: {
    mockData: [
      { id: 1, title: 'Session 1', event_id: 1, status: 'confirmed' },
      { id: 2, title: 'Session 2', event_id: 2, status: 'pending' }
    ],
    successResponse: {
      code: 'USER0012',
      message: 'User sessions retrieved successfully'
    }
  },

  // ==================== GET USER REGISTRATIONS ====================
  getUserRegistrations: {
    mockData: [
      { id: 1, event_id: 1, status: 'confirmed', attended: true },
      { id: 2, event_id: 2, status: 'confirmed', attended: false }
    ],
    successResponse: {
      code: 'USER0013',
      message: 'User registrations retrieved successfully'
    }
  },

  // ==================== AUTOCOMPLETE ====================
  autocomplete: {
    validQuery: {
      query: 'john',
      expectedMinResults: 1
    },
    emptyQuery: {
      query: '',
      expectedStatus: 400
    },
    noResults: {
      query: 'xyznonexistent',
      expectedResults: []
    },
    mockData: [
      { id: 2, name: 'John Doe', handle: 'johndoe', email: 'john@example.com' },
      { id: 5, name: 'Johnny Smith', handle: 'johnny', email: 'johnny@example.com' }
    ]
  },

  // ==================== PUBLIC PROFILE ====================
  publicProfile: {
    validId: 2,
    nonExistentId: 99999,

    mockData: {
      id: 2,
      name: 'John Doe',
      handle: 'johndoe',
      bio: 'Software developer',
      avatar: null,
      // Should NOT include email, admin status, etc.
    },

    // Fields that should NOT be in public profile
    privateFields: ['email', 'admin', 'locked', 'email_confirmed', 'password']
  }
};
