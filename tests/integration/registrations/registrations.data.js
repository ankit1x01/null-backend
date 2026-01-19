/**
 * Event Registrations Module - Test Data
 * Contains all test data, payloads, and expected responses for registrations API tests
 */

module.exports = {
  // ============================================================
  // GET /api/event-registrations/getRegistrations
  // ============================================================
  getRegistrations: {
    mockData: [
      {
        id: 1,
        event_id: 1,
        user_id: 10,
        user: { id: 10, name: 'John Doe', email: 'john@example.com' },
        event: { id: 1, title: 'Tech Meetup 2024' },
        status: 'confirmed',
        ticket_type: 'general',
        check_in_time: null,
        registered_at: '2024-01-20T10:00:00Z'
      },
      {
        id: 2,
        event_id: 1,
        user_id: 11,
        user: { id: 11, name: 'Jane Smith', email: 'jane@example.com' },
        event: { id: 1, title: 'Tech Meetup 2024' },
        status: 'waitlisted',
        ticket_type: 'general',
        check_in_time: null,
        registered_at: '2024-01-21T14:00:00Z'
      }
    ],
    paginatedMockData: {
      rows: [{ id: 1, status: 'confirmed' }],
      count: 150,
      totalPages: 15,
      currentPage: 1
    }
  },

  // ============================================================
  // GET /api/event-registrations/getRegistrationById
  // ============================================================
  getRegistrationById: {
    validId: 1,
    nonExistentId: 99999,
    mockData: {
      id: 1,
      event_id: 1,
      user_id: 10,
      user: {
        id: 10,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91-9876543210'
      },
      event: {
        id: 1,
        title: 'Tech Meetup 2024',
        start_date: '2024-02-15T18:00:00Z'
      },
      status: 'confirmed',
      ticket_type: 'general',
      check_in_time: null,
      qr_code: 'REG-001-ABCD1234',
      custom_fields: {
        dietary_preference: 'vegetarian',
        t_shirt_size: 'M'
      },
      registered_at: '2024-01-20T10:00:00Z',
      updated_at: '2024-01-20T10:00:00Z'
    }
  },

  // ============================================================
  // POST /api/event-registrations/register
  // ============================================================
  register: {
    validPayload: {
      payload: {
        event_id: 1,
        ticket_type: 'general',
        custom_fields: {
          dietary_preference: 'vegetarian'
        }
      },
      expectedStatus: 201,
      expectedResponse: {
        id: 3,
        event_id: 1,
        status: 'confirmed',
        qr_code: 'REG-003-EFGH5678'
      }
    },
    minimalPayload: {
      payload: {
        event_id: 1
      },
      expectedStatus: 201
    },
    waitlistedPayload: {
      payload: {
        event_id: 2 // Event at capacity
      },
      expectedStatus: 201,
      expectedResponse: {
        status: 'waitlisted'
      }
    },
    missingEventId: {
      payload: {},
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    invalidEventId: {
      payload: {
        event_id: 99999
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    },
    alreadyRegistered: {
      payload: {
        event_id: 1
      },
      expectedStatus: 409,
      expectedError: 'ALREADY_REGISTERED'
    },
    eventClosed: {
      payload: {
        event_id: 3 // Registration closed
      },
      expectedStatus: 400,
      expectedError: 'REGISTRATION_CLOSED'
    },
    pastEvent: {
      payload: {
        event_id: 4 // Past event
      },
      expectedStatus: 400,
      expectedError: 'EVENT_ENDED'
    },
    unpublishedEvent: {
      payload: {
        event_id: 5 // Unpublished event
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    }
  },

  // ============================================================
  // PUT /api/event-registrations/updateRegistration/:id
  // ============================================================
  updateRegistration: {
    validUpdate: {
      registrationId: 1,
      payload: {
        custom_fields: {
          dietary_preference: 'vegan',
          t_shirt_size: 'L'
        }
      },
      expectedStatus: 200
    },
    updateStatus: {
      registrationId: 2,
      payload: {
        status: 'confirmed'
      },
      expectedStatus: 200
    },
    invalidId: {
      registrationId: 99999,
      payload: {
        status: 'confirmed'
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    },
    invalidStatus: {
      registrationId: 1,
      payload: {
        status: 'invalid-status'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    cannotUpdateOthers: {
      registrationId: 2, // Not owned by current user
      payload: {
        custom_fields: {}
      },
      expectedStatus: 403,
      expectedError: 'FORBIDDEN'
    }
  },

  // ============================================================
  // DELETE /api/event-registrations/cancelRegistration/:id
  // ============================================================
  cancelRegistration: {
    validId: 1,
    nonExistentId: 99999,
    checkedInId: 3, // Already checked in
    pastEventId: 4, // Registration for past event
    expectedResponse: {
      message: 'Registration cancelled successfully'
    }
  },

  // ============================================================
  // POST /api/event-registrations/checkIn/:id
  // ============================================================
  checkIn: {
    validPayload: {
      registrationId: 1,
      payload: {
        qr_code: 'REG-001-ABCD1234'
      },
      expectedStatus: 200,
      expectedResponse: {
        message: 'Check-in successful',
        check_in_time: expect.any(String)
      }
    },
    alreadyCheckedIn: {
      registrationId: 3,
      payload: {
        qr_code: 'REG-003-WXYZ9999'
      },
      expectedStatus: 400,
      expectedError: 'ALREADY_CHECKED_IN'
    },
    invalidQrCode: {
      registrationId: 1,
      payload: {
        qr_code: 'INVALID-QR-CODE'
      },
      expectedStatus: 400,
      expectedError: 'INVALID_QR_CODE'
    },
    cancelledRegistration: {
      registrationId: 4, // Cancelled registration
      payload: {
        qr_code: 'REG-004-CANCELLED'
      },
      expectedStatus: 400,
      expectedError: 'REGISTRATION_CANCELLED'
    },
    wrongEvent: {
      registrationId: 5, // Registration for different event
      payload: {},
      expectedStatus: 400,
      expectedError: 'WRONG_EVENT'
    }
  },

  // ============================================================
  // POST /api/event-registrations/bulkCheckIn
  // ============================================================
  bulkCheckIn: {
    validPayload: {
      payload: {
        event_id: 1,
        registration_ids: [1, 2, 5]
      },
      expectedStatus: 200,
      expectedResponse: {
        success_count: 3,
        failed_count: 0,
        results: []
      }
    },
    partialSuccess: {
      payload: {
        event_id: 1,
        registration_ids: [1, 3, 99999] // 3 is already checked in, 99999 doesn't exist
      },
      expectedStatus: 200,
      expectedResponse: {
        success_count: 1,
        failed_count: 2
      }
    },
    missingEventId: {
      payload: {
        registration_ids: [1, 2]
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    emptyRegistrationIds: {
      payload: {
        event_id: 1,
        registration_ids: []
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // POST /api/event-registrations/massUpdate
  // ============================================================
  massUpdate: {
    validPayload: {
      payload: {
        registration_ids: [1, 2, 5],
        status: 'confirmed'
      },
      expectedStatus: 200,
      expectedResponse: {
        updated_count: 3
      }
    },
    sendNotification: {
      payload: {
        registration_ids: [1, 2],
        status: 'confirmed',
        send_notification: true
      },
      expectedStatus: 200
    },
    invalidStatus: {
      payload: {
        registration_ids: [1, 2],
        status: 'invalid'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // GET /api/event-registrations/getMyRegistrations
  // ============================================================
  getMyRegistrations: {
    mockData: [
      {
        id: 1,
        event_id: 1,
        event: { id: 1, title: 'Tech Meetup 2024', start_date: '2024-02-15T18:00:00Z' },
        status: 'confirmed',
        registered_at: '2024-01-20T10:00:00Z'
      }
    ],
    upcomingMockData: [
      { id: 1, event: { title: 'Tech Meetup 2024' }, status: 'confirmed' }
    ],
    pastMockData: [
      { id: 2, event: { title: 'Past Workshop' }, status: 'attended' }
    ]
  },

  // ============================================================
  // GET /api/event-registrations/getEventStats
  // ============================================================
  getEventStats: {
    validEventId: 1,
    mockData: {
      total_registrations: 150,
      confirmed: 120,
      waitlisted: 20,
      cancelled: 10,
      checked_in: 80,
      check_in_rate: 66.67,
      capacity: 200,
      capacity_used: 75.0,
      registration_by_day: [
        { date: '2024-01-20', count: 50 },
        { date: '2024-01-21', count: 40 },
        { date: '2024-01-22', count: 30 }
      ]
    }
  },

  // ============================================================
  // POST /api/event-registrations/exportRegistrations
  // ============================================================
  exportRegistrations: {
    validPayload: {
      payload: {
        event_id: 1,
        format: 'csv'
      },
      expectedStatus: 200
    },
    excelFormat: {
      payload: {
        event_id: 1,
        format: 'xlsx'
      },
      expectedStatus: 200
    },
    withFilters: {
      payload: {
        event_id: 1,
        format: 'csv',
        status: 'confirmed'
      },
      expectedStatus: 200
    },
    invalidFormat: {
      payload: {
        event_id: 1,
        format: 'invalid'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // POST /api/event-registrations/sendReminder
  // ============================================================
  sendReminder: {
    validPayload: {
      payload: {
        event_id: 1,
        registration_ids: [1, 2, 5],
        message: 'Reminder: Event starting tomorrow!'
      },
      expectedStatus: 200,
      expectedResponse: {
        sent_count: 3
      }
    },
    sendToAll: {
      payload: {
        event_id: 1,
        send_to_all: true,
        message: 'Reminder for all attendees'
      },
      expectedStatus: 200
    },
    missingMessage: {
      payload: {
        event_id: 1,
        registration_ids: [1]
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // Shared Test Data
  // ============================================================
  validStatuses: ['pending', 'confirmed', 'waitlisted', 'cancelled', 'attended', 'no_show'],
  validTicketTypes: ['general', 'vip', 'speaker', 'organizer', 'volunteer'],
  requiredFields: ['event_id'],
  exportFormats: ['csv', 'xlsx', 'json']
};
