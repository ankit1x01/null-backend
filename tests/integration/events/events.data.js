/**
 * Events Module - Test Data
 * Contains all test data, payloads, and expected responses for events API tests
 */

module.exports = {
  // ============================================================
  // GET /api/events/getEvents
  // ============================================================
  getEvents: {
    mockData: [
      {
        id: 1,
        title: 'Tech Meetup 2024',
        slug: 'tech-meetup-2024',
        description: 'Annual technology meetup',
        chapter_id: 1,
        venue_id: 1,
        event_type_id: 1,
        start_date: '2024-02-15T18:00:00Z',
        end_date: '2024-02-15T21:00:00Z',
        status: 'published',
        is_published: true,
        registrations_count: 150,
        max_attendees: 200,
        cover_image: 'https://example.com/event1.jpg',
        created_at: '2024-01-01T10:00:00Z'
      },
      {
        id: 2,
        title: 'AI Workshop',
        slug: 'ai-workshop',
        description: 'Introduction to AI and Machine Learning',
        chapter_id: 1,
        venue_id: 2,
        event_type_id: 2,
        start_date: '2024-02-20T14:00:00Z',
        end_date: '2024-02-20T17:00:00Z',
        status: 'published',
        is_published: true,
        registrations_count: 75,
        max_attendees: 100,
        cover_image: 'https://example.com/event2.jpg',
        created_at: '2024-01-05T12:00:00Z'
      }
    ],
    paginatedMockData: {
      rows: [{ id: 1, title: 'Tech Meetup 2024' }],
      count: 50,
      totalPages: 5,
      currentPage: 1
    },
    upcomingEvents: {
      filter: 'upcoming',
      mockData: [{ id: 1, title: 'Tech Meetup 2024', status: 'published' }]
    },
    pastEvents: {
      filter: 'past',
      mockData: [{ id: 3, title: 'Past Event', status: 'completed' }]
    },
    draftEvents: {
      filter: 'draft',
      mockData: [{ id: 4, title: 'Draft Event', status: 'draft' }]
    }
  },

  // ============================================================
  // GET /api/events/getEventById
  // ============================================================
  getEventById: {
    validId: 1,
    nonExistentId: 99999,
    unpublishedId: 4,
    mockData: {
      id: 1,
      title: 'Tech Meetup 2024',
      slug: 'tech-meetup-2024',
      description: 'Annual technology meetup with speakers from top tech companies',
      chapter_id: 1,
      chapter: {
        id: 1,
        name: 'Tech City Chapter',
        slug: 'tech-city'
      },
      venue_id: 1,
      venue: {
        id: 1,
        name: 'Tech Hub Conference Center',
        address: '123 Tech Street',
        city: 'Tech City'
      },
      event_type_id: 1,
      event_type: {
        id: 1,
        name: 'Meetup'
      },
      start_date: '2024-02-15T18:00:00Z',
      end_date: '2024-02-15T21:00:00Z',
      timezone: 'Asia/Kolkata',
      status: 'published',
      is_published: true,
      is_featured: false,
      registrations_count: 150,
      max_attendees: 200,
      cover_image: 'https://example.com/event1.jpg',
      sessions: [
        { id: 1, title: 'Opening Keynote', speaker_id: 1 },
        { id: 2, title: 'Panel Discussion', speaker_id: 2 }
      ],
      organizers: [
        { id: 1, name: 'John Organizer', role: 'main' }
      ],
      created_at: '2024-01-01T10:00:00Z',
      updated_at: '2024-01-15T14:30:00Z'
    },
    unpublishedMockData: {
      id: 4,
      title: 'Draft Event',
      status: 'draft',
      is_published: false
    }
  },

  // ============================================================
  // GET /api/events/getEventBySlug
  // ============================================================
  getEventBySlug: {
    validSlug: 'tech-meetup-2024',
    nonExistentSlug: 'non-existent-event',
    unpublishedSlug: 'draft-event',
    mockData: {
      id: 1,
      title: 'Tech Meetup 2024',
      slug: 'tech-meetup-2024',
      status: 'published'
    }
  },

  // ============================================================
  // POST /api/events/createEvent
  // ============================================================
  createEvent: {
    validPayload: {
      payload: {
        title: 'New Tech Event',
        slug: 'new-tech-event',
        description: 'A brand new technology event',
        chapter_id: 1,
        venue_id: 1,
        event_type_id: 1,
        start_date: '2024-03-15T18:00:00Z',
        end_date: '2024-03-15T21:00:00Z',
        timezone: 'Asia/Kolkata',
        max_attendees: 100
      },
      expectedStatus: 201,
      expectedResponse: {
        id: 5,
        title: 'New Tech Event',
        status: 'draft'
      }
    },
    minimalPayload: {
      payload: {
        title: 'Minimal Event',
        slug: 'minimal-event',
        chapter_id: 1,
        start_date: '2024-03-20T10:00:00Z',
        end_date: '2024-03-20T12:00:00Z'
      },
      expectedStatus: 201
    },
    fullPayload: {
      payload: {
        title: 'Complete Event',
        slug: 'complete-event',
        description: 'Full event with all fields',
        chapter_id: 1,
        venue_id: 1,
        event_type_id: 1,
        start_date: '2024-03-25T09:00:00Z',
        end_date: '2024-03-25T18:00:00Z',
        timezone: 'Asia/Kolkata',
        max_attendees: 500,
        cover_image: 'https://example.com/new-event.jpg',
        is_featured: true,
        registration_deadline: '2024-03-20T23:59:59Z',
        tags: ['technology', 'networking', 'innovation'],
        external_url: 'https://example.com/event-info'
      },
      expectedStatus: 201
    },
    missingTitle: {
      payload: {
        slug: 'no-title-event',
        chapter_id: 1,
        start_date: '2024-03-15T18:00:00Z',
        end_date: '2024-03-15T21:00:00Z'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    missingChapter: {
      payload: {
        title: 'No Chapter Event',
        slug: 'no-chapter-event',
        start_date: '2024-03-15T18:00:00Z',
        end_date: '2024-03-15T21:00:00Z'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    invalidDateRange: {
      payload: {
        title: 'Invalid Date Event',
        slug: 'invalid-date-event',
        chapter_id: 1,
        start_date: '2024-03-15T21:00:00Z',
        end_date: '2024-03-15T18:00:00Z' // End before start
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    duplicateSlug: {
      payload: {
        title: 'Duplicate Slug Event',
        slug: 'tech-meetup-2024', // Already exists
        chapter_id: 1,
        start_date: '2024-03-15T18:00:00Z',
        end_date: '2024-03-15T21:00:00Z'
      },
      expectedStatus: 409,
      expectedError: 'DUPLICATE_ENTRY'
    },
    invalidChapter: {
      payload: {
        title: 'Invalid Chapter Event',
        slug: 'invalid-chapter-event',
        chapter_id: 99999,
        start_date: '2024-03-15T18:00:00Z',
        end_date: '2024-03-15T21:00:00Z'
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    },
    pastDate: {
      payload: {
        title: 'Past Date Event',
        slug: 'past-date-event',
        chapter_id: 1,
        start_date: '2020-01-01T10:00:00Z',
        end_date: '2020-01-01T12:00:00Z'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // PUT /api/events/updateEvent/:id
  // ============================================================
  updateEvent: {
    validUpdate: {
      eventId: 1,
      payload: {
        title: 'Updated Tech Meetup 2024',
        description: 'Updated description for the event',
        max_attendees: 250
      },
      expectedStatus: 200,
      expectedResponse: {
        id: 1,
        title: 'Updated Tech Meetup 2024'
      }
    },
    partialUpdate: {
      eventId: 1,
      payload: {
        description: 'Only updating description'
      },
      expectedStatus: 200
    },
    updateStatus: {
      eventId: 4,
      payload: {
        status: 'published',
        is_published: true
      },
      expectedStatus: 200
    },
    updateVenue: {
      eventId: 1,
      payload: {
        venue_id: 2
      },
      expectedStatus: 200
    },
    invalidId: {
      eventId: 99999,
      payload: {
        title: 'Updated Event'
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    },
    invalidDateRange: {
      eventId: 1,
      payload: {
        start_date: '2024-03-15T21:00:00Z',
        end_date: '2024-03-15T18:00:00Z'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    duplicateSlug: {
      eventId: 1,
      payload: {
        slug: 'ai-workshop'
      },
      expectedStatus: 409,
      expectedError: 'DUPLICATE_ENTRY'
    }
  },

  // ============================================================
  // DELETE /api/events/deleteEvent/:id
  // ============================================================
  deleteEvent: {
    validId: 2,
    nonExistentId: 99999,
    eventWithRegistrations: 1, // Cannot delete event with registrations
    publishedEvent: 1, // May have restrictions on deleting published events
    expectedResponse: {
      message: 'Event deleted successfully'
    }
  },

  // ============================================================
  // POST /api/events/publishEvent/:id
  // ============================================================
  publishEvent: {
    draftEventId: 4,
    alreadyPublishedId: 1,
    incompleteEventId: 5,
    expectedResponse: {
      message: 'Event published successfully',
      status: 'published'
    }
  },

  // ============================================================
  // POST /api/events/unpublishEvent/:id
  // ============================================================
  unpublishEvent: {
    publishedEventId: 1,
    draftEventId: 4,
    eventWithRegistrations: 1, // May have warnings
    expectedResponse: {
      message: 'Event unpublished successfully',
      status: 'draft'
    }
  },

  // ============================================================
  // GET /api/events/getEventRegistrations
  // ============================================================
  getEventRegistrations: {
    validEventId: 1,
    nonExistentEventId: 99999,
    mockData: [
      {
        id: 1,
        event_id: 1,
        user_id: 10,
        user: {
          id: 10,
          name: 'Attendee One',
          email: 'attendee1@example.com'
        },
        status: 'confirmed',
        registered_at: '2024-01-20T10:00:00Z'
      },
      {
        id: 2,
        event_id: 1,
        user_id: 11,
        user: {
          id: 11,
          name: 'Attendee Two',
          email: 'attendee2@example.com'
        },
        status: 'waitlisted',
        registered_at: '2024-01-21T14:00:00Z'
      }
    ],
    filteredByStatus: {
      status: 'confirmed',
      mockData: [
        { id: 1, status: 'confirmed', user: { name: 'Attendee One' } }
      ]
    }
  },

  // ============================================================
  // GET /api/events/getEventSessions
  // ============================================================
  getEventSessions: {
    validEventId: 1,
    nonExistentEventId: 99999,
    mockData: [
      {
        id: 1,
        event_id: 1,
        title: 'Opening Keynote',
        description: 'Welcome and opening keynote',
        speaker_id: 1,
        speaker: {
          id: 1,
          name: 'Keynote Speaker',
          bio: 'Industry expert'
        },
        start_time: '2024-02-15T18:00:00Z',
        end_time: '2024-02-15T19:00:00Z',
        status: 'confirmed'
      },
      {
        id: 2,
        event_id: 1,
        title: 'Panel Discussion',
        description: 'Panel on emerging technologies',
        start_time: '2024-02-15T19:15:00Z',
        end_time: '2024-02-15T20:30:00Z',
        status: 'confirmed'
      }
    ]
  },

  // ============================================================
  // POST /api/events/duplicateEvent/:id
  // ============================================================
  duplicateEvent: {
    validEventId: 1,
    nonExistentEventId: 99999,
    payload: {
      new_title: 'Tech Meetup 2024 - Copy',
      new_slug: 'tech-meetup-2024-copy',
      new_start_date: '2024-04-15T18:00:00Z',
      new_end_date: '2024-04-15T21:00:00Z'
    },
    expectedResponse: {
      id: 6,
      title: 'Tech Meetup 2024 - Copy',
      slug: 'tech-meetup-2024-copy',
      status: 'draft'
    }
  },

  // ============================================================
  // GET /api/events/getUpcomingEvents
  // ============================================================
  getUpcomingEvents: {
    mockData: [
      { id: 1, title: 'Tech Meetup 2024', start_date: '2024-02-15T18:00:00Z' },
      { id: 2, title: 'AI Workshop', start_date: '2024-02-20T14:00:00Z' }
    ],
    limitedMockData: {
      limit: 5,
      mockData: [{ id: 1, title: 'Tech Meetup 2024' }]
    }
  },

  // ============================================================
  // GET /api/events/getFeaturedEvents
  // ============================================================
  getFeaturedEvents: {
    mockData: [
      { id: 1, title: 'Tech Meetup 2024', is_featured: true }
    ]
  },

  // ============================================================
  // GET /api/events/search
  // ============================================================
  searchEvents: {
    validQuery: {
      query: 'tech',
      mockData: [
        { id: 1, title: 'Tech Meetup 2024' }
      ]
    },
    noResults: {
      query: 'nonexistent',
      mockData: []
    },
    withFilters: {
      query: 'workshop',
      filters: {
        chapter_id: 1,
        event_type_id: 2,
        status: 'published'
      },
      mockData: [
        { id: 2, title: 'AI Workshop' }
      ]
    }
  },

  // ============================================================
  // Shared Test Data
  // ============================================================
  validStatuses: ['draft', 'published', 'cancelled', 'completed'],
  validEventTypes: [
    { id: 1, name: 'Meetup' },
    { id: 2, name: 'Workshop' },
    { id: 3, name: 'Conference' },
    { id: 4, name: 'Webinar' }
  ],
  requiredFields: ['title', 'slug', 'chapter_id', 'start_date', 'end_date'],
  maxLengths: {
    title: 255,
    slug: 100,
    description: 10000
  }
};
