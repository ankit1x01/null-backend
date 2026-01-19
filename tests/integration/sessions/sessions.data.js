/**
 * Event Sessions Module - Test Data
 * Contains all test data, payloads, and expected responses for sessions API tests
 */

module.exports = {
  // ============================================================
  // GET /api/event-sessions/getSessions
  // ============================================================
  getSessions: {
    mockData: [
      {
        id: 1,
        event_id: 1,
        title: 'Opening Keynote',
        description: 'Welcome and opening keynote presentation',
        speaker_id: 1,
        speaker: { id: 1, name: 'John Speaker', bio: 'Tech Leader' },
        start_time: '2024-02-15T18:00:00Z',
        end_time: '2024-02-15T19:00:00Z',
        room: 'Main Hall',
        status: 'confirmed',
        level: 'beginner',
        track: 'General',
        max_attendees: 500
      },
      {
        id: 2,
        event_id: 1,
        title: 'Introduction to AI',
        description: 'A comprehensive introduction to AI',
        speaker_id: 2,
        speaker: { id: 2, name: 'Jane Expert', bio: 'AI Researcher' },
        start_time: '2024-02-15T19:15:00Z',
        end_time: '2024-02-15T20:15:00Z',
        room: 'Room A',
        status: 'confirmed',
        level: 'intermediate',
        track: 'AI/ML',
        max_attendees: 100
      }
    ],
    paginatedMockData: {
      rows: [{ id: 1, title: 'Opening Keynote' }],
      count: 25,
      totalPages: 3,
      currentPage: 1
    }
  },

  // ============================================================
  // GET /api/event-sessions/getSessionById
  // ============================================================
  getSessionById: {
    validId: 1,
    nonExistentId: 99999,
    mockData: {
      id: 1,
      event_id: 1,
      event: { id: 1, title: 'Tech Meetup 2024' },
      title: 'Opening Keynote',
      description: 'Welcome and opening keynote presentation',
      speaker_id: 1,
      speaker: {
        id: 1,
        name: 'John Speaker',
        email: 'speaker@example.com',
        bio: 'Tech Leader with 15 years experience',
        photo_url: 'https://example.com/photo.jpg',
        social_links: { twitter: '@johnspeaker' }
      },
      co_speakers: [],
      start_time: '2024-02-15T18:00:00Z',
      end_time: '2024-02-15T19:00:00Z',
      room: 'Main Hall',
      status: 'confirmed',
      level: 'beginner',
      track: 'General',
      tags: ['keynote', 'opening'],
      resources: [
        { type: 'slides', url: 'https://example.com/slides.pdf' }
      ],
      feedback_enabled: true,
      recording_url: null,
      created_at: '2024-01-10T10:00:00Z'
    }
  },

  // ============================================================
  // POST /api/event-sessions/createSession
  // ============================================================
  createSession: {
    validPayload: {
      payload: {
        event_id: 1,
        title: 'New Workshop Session',
        description: 'Hands-on workshop session',
        speaker_id: 1,
        start_time: '2024-02-15T14:00:00Z',
        end_time: '2024-02-15T15:30:00Z',
        room: 'Workshop Room',
        level: 'intermediate',
        track: 'Workshops'
      },
      expectedStatus: 201,
      expectedResponse: {
        id: 3,
        title: 'New Workshop Session',
        status: 'pending'
      }
    },
    minimalPayload: {
      payload: {
        event_id: 1,
        title: 'Minimal Session',
        start_time: '2024-02-15T10:00:00Z',
        end_time: '2024-02-15T11:00:00Z'
      },
      expectedStatus: 201
    },
    fullPayload: {
      payload: {
        event_id: 1,
        title: 'Complete Session',
        description: 'Full session with all fields',
        speaker_id: 1,
        co_speaker_ids: [2, 3],
        start_time: '2024-02-15T16:00:00Z',
        end_time: '2024-02-15T17:30:00Z',
        room: 'Main Hall',
        level: 'advanced',
        track: 'Deep Dive',
        tags: ['advanced', 'deep-dive', 'expert'],
        max_attendees: 50,
        resources: [
          { type: 'slides', url: 'https://example.com/slides.pdf' }
        ]
      },
      expectedStatus: 201
    },
    missingTitle: {
      payload: {
        event_id: 1,
        start_time: '2024-02-15T10:00:00Z',
        end_time: '2024-02-15T11:00:00Z'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    missingEventId: {
      payload: {
        title: 'No Event Session',
        start_time: '2024-02-15T10:00:00Z',
        end_time: '2024-02-15T11:00:00Z'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    invalidTimeRange: {
      payload: {
        event_id: 1,
        title: 'Invalid Time Session',
        start_time: '2024-02-15T15:00:00Z',
        end_time: '2024-02-15T14:00:00Z' // End before start
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    overlappingSession: {
      payload: {
        event_id: 1,
        title: 'Overlapping Session',
        speaker_id: 1, // Same speaker
        start_time: '2024-02-15T18:30:00Z', // Overlaps with session 1
        end_time: '2024-02-15T19:30:00Z',
        room: 'Room B'
      },
      expectedStatus: 409,
      expectedError: 'CONFLICT'
    },
    roomConflict: {
      payload: {
        event_id: 1,
        title: 'Room Conflict Session',
        start_time: '2024-02-15T18:30:00Z',
        end_time: '2024-02-15T19:30:00Z',
        room: 'Main Hall' // Same room as session 1
      },
      expectedStatus: 409,
      expectedError: 'ROOM_CONFLICT'
    },
    invalidSpeaker: {
      payload: {
        event_id: 1,
        title: 'Invalid Speaker Session',
        speaker_id: 99999,
        start_time: '2024-02-15T10:00:00Z',
        end_time: '2024-02-15T11:00:00Z'
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    }
  },

  // ============================================================
  // PUT /api/event-sessions/updateSession/:id
  // ============================================================
  updateSession: {
    validUpdate: {
      sessionId: 1,
      payload: {
        title: 'Updated Opening Keynote',
        description: 'Updated description',
        room: 'Grand Hall'
      },
      expectedStatus: 200,
      expectedResponse: {
        id: 1,
        title: 'Updated Opening Keynote',
        room: 'Grand Hall'
      }
    },
    partialUpdate: {
      sessionId: 1,
      payload: {
        description: 'Only updating description'
      },
      expectedStatus: 200
    },
    updateSpeaker: {
      sessionId: 1,
      payload: {
        speaker_id: 2
      },
      expectedStatus: 200
    },
    updateTime: {
      sessionId: 2,
      payload: {
        start_time: '2024-02-15T19:30:00Z',
        end_time: '2024-02-15T20:30:00Z'
      },
      expectedStatus: 200
    },
    invalidId: {
      sessionId: 99999,
      payload: {
        title: 'Updated Session'
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    },
    invalidTimeRange: {
      sessionId: 1,
      payload: {
        start_time: '2024-02-15T20:00:00Z',
        end_time: '2024-02-15T19:00:00Z'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // DELETE /api/event-sessions/deleteSession/:id
  // ============================================================
  deleteSession: {
    validId: 2,
    nonExistentId: 99999,
    sessionWithAttendees: 1, // Session with registrations
    expectedResponse: {
      message: 'Session deleted successfully'
    }
  },

  // ============================================================
  // POST /api/event-sessions/confirmSession/:id
  // ============================================================
  confirmSession: {
    pendingSessionId: 3,
    alreadyConfirmedId: 1,
    expectedResponse: {
      message: 'Session confirmed',
      status: 'confirmed'
    }
  },

  // ============================================================
  // POST /api/event-sessions/rejectSession/:id
  // ============================================================
  rejectSession: {
    pendingSessionId: 4,
    alreadyConfirmedId: 1,
    payload: {
      rejection_reason: 'Session does not fit the event theme'
    },
    expectedResponse: {
      message: 'Session rejected',
      status: 'rejected'
    }
  },

  // ============================================================
  // GET /api/event-sessions/getSessionAttendees
  // ============================================================
  getSessionAttendees: {
    validSessionId: 1,
    nonExistentSessionId: 99999,
    mockData: [
      {
        id: 1,
        session_id: 1,
        user_id: 10,
        user: { id: 10, name: 'Attendee One', email: 'attendee1@example.com' },
        status: 'confirmed',
        registered_at: '2024-01-25T10:00:00Z'
      },
      {
        id: 2,
        session_id: 1,
        user_id: 11,
        user: { id: 11, name: 'Attendee Two', email: 'attendee2@example.com' },
        status: 'confirmed',
        registered_at: '2024-01-26T14:00:00Z'
      }
    ]
  },

  // ============================================================
  // POST /api/event-sessions/registerForSession
  // ============================================================
  registerForSession: {
    validPayload: {
      payload: {
        session_id: 2
      },
      expectedStatus: 200,
      expectedResponse: {
        message: 'Successfully registered for session'
      }
    },
    alreadyRegistered: {
      payload: {
        session_id: 1
      },
      expectedStatus: 409,
      expectedError: 'ALREADY_REGISTERED'
    },
    sessionFull: {
      payload: {
        session_id: 3 // Session at capacity
      },
      expectedStatus: 400,
      expectedError: 'SESSION_FULL'
    },
    notRegisteredForEvent: {
      payload: {
        session_id: 5 // Session for event user is not registered
      },
      expectedStatus: 400,
      expectedError: 'NOT_REGISTERED_FOR_EVENT'
    }
  },

  // ============================================================
  // DELETE /api/event-sessions/unregisterFromSession
  // ============================================================
  unregisterFromSession: {
    validPayload: {
      payload: {
        session_id: 1
      },
      expectedStatus: 200,
      expectedResponse: {
        message: 'Successfully unregistered from session'
      }
    },
    notRegistered: {
      payload: {
        session_id: 2
      },
      expectedStatus: 404,
      expectedError: 'NOT_REGISTERED'
    }
  },

  // ============================================================
  // GET /api/event-sessions/getSessionFeedback
  // ============================================================
  getSessionFeedback: {
    validSessionId: 1,
    mockData: [
      {
        id: 1,
        session_id: 1,
        user_id: 10,
        rating: 5,
        comment: 'Excellent session!',
        created_at: '2024-02-15T21:00:00Z'
      },
      {
        id: 2,
        session_id: 1,
        user_id: 11,
        rating: 4,
        comment: 'Very informative',
        created_at: '2024-02-15T21:15:00Z'
      }
    ],
    aggregatedMockData: {
      session_id: 1,
      average_rating: 4.5,
      total_feedback: 50,
      rating_distribution: {
        5: 25,
        4: 15,
        3: 7,
        2: 2,
        1: 1
      }
    }
  },

  // ============================================================
  // POST /api/event-sessions/submitFeedback
  // ============================================================
  submitFeedback: {
    validPayload: {
      payload: {
        session_id: 1,
        rating: 5,
        comment: 'Great session, learned a lot!'
      },
      expectedStatus: 201,
      expectedResponse: {
        message: 'Feedback submitted successfully'
      }
    },
    minimalPayload: {
      payload: {
        session_id: 1,
        rating: 4
      },
      expectedStatus: 201
    },
    invalidRating: {
      payload: {
        session_id: 1,
        rating: 6 // Out of range
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    sessionNotAttended: {
      payload: {
        session_id: 5, // Not attended
        rating: 5
      },
      expectedStatus: 400,
      expectedError: 'NOT_ATTENDED'
    },
    alreadySubmitted: {
      payload: {
        session_id: 1,
        rating: 5
      },
      expectedStatus: 409,
      expectedError: 'FEEDBACK_ALREADY_SUBMITTED'
    }
  },

  // ============================================================
  // GET /api/event-sessions/getMySessions
  // ============================================================
  getMySessions: {
    mockData: [
      {
        id: 1,
        event_id: 1,
        event: { title: 'Tech Meetup 2024' },
        title: 'Opening Keynote',
        start_time: '2024-02-15T18:00:00Z',
        status: 'registered'
      }
    ]
  },

  // ============================================================
  // GET /api/event-sessions/getSpeakerSessions
  // ============================================================
  getSpeakerSessions: {
    validSpeakerId: 1,
    mockData: [
      {
        id: 1,
        event_id: 1,
        event: { title: 'Tech Meetup 2024' },
        title: 'Opening Keynote',
        status: 'confirmed'
      }
    ]
  },

  // ============================================================
  // Shared Test Data
  // ============================================================
  validStatuses: ['pending', 'confirmed', 'rejected', 'cancelled'],
  validLevels: ['beginner', 'intermediate', 'advanced', 'all'],
  validTracks: ['General', 'AI/ML', 'Web Development', 'Cloud', 'DevOps', 'Security', 'Workshops'],
  requiredFields: ['event_id', 'title', 'start_time', 'end_time'],
  maxLengths: {
    title: 255,
    description: 5000,
    room: 100
  },
  ratingRange: { min: 1, max: 5 }
};
