/**
 * Venues Module - Test Data
 * Contains all test data, payloads, and expected responses for venues API tests
 */

module.exports = {
  // ============================================================
  // GET /api/venues/getVenues
  // ============================================================
  getVenues: {
    mockData: [
      {
        id: 1,
        name: 'Tech Hub Conference Center',
        slug: 'tech-hub',
        description: 'Modern conference center with all facilities',
        address: '123 Tech Street',
        city: 'Tech City',
        state: 'State',
        country: 'India',
        postal_code: '123456',
        latitude: 12.9716,
        longitude: 77.5946,
        capacity: 500,
        amenities: ['wifi', 'projector', 'parking', 'catering'],
        contact_email: 'contact@techhub.com',
        contact_phone: '+91-9876543210',
        status: 'active',
        images: ['https://example.com/venue1.jpg'],
        created_at: '2023-01-01T10:00:00Z'
      },
      {
        id: 2,
        name: 'Innovation Labs',
        slug: 'innovation-labs',
        description: 'Startup workspace with event facilities',
        address: '456 Innovation Drive',
        city: 'Innovation City',
        state: 'State',
        country: 'India',
        postal_code: '654321',
        latitude: 12.9716,
        longitude: 77.5946,
        capacity: 200,
        amenities: ['wifi', 'whiteboard', 'parking'],
        contact_email: 'events@innovationlabs.com',
        contact_phone: '+91-9876543211',
        status: 'active',
        images: ['https://example.com/venue2.jpg'],
        created_at: '2023-06-15T10:00:00Z'
      }
    ],
    paginatedMockData: {
      rows: [{ id: 1, name: 'Tech Hub Conference Center' }],
      count: 25,
      totalPages: 3,
      currentPage: 1
    }
  },

  // ============================================================
  // GET /api/venues/getVenueById
  // ============================================================
  getVenueById: {
    validId: 1,
    nonExistentId: 99999,
    mockData: {
      id: 1,
      name: 'Tech Hub Conference Center',
      slug: 'tech-hub',
      description: 'Modern conference center with all facilities',
      address: '123 Tech Street',
      city: 'Tech City',
      state: 'State',
      country: 'India',
      postal_code: '123456',
      latitude: 12.9716,
      longitude: 77.5946,
      capacity: 500,
      amenities: ['wifi', 'projector', 'parking', 'catering'],
      rooms: [
        { id: 1, name: 'Main Hall', capacity: 300 },
        { id: 2, name: 'Room A', capacity: 100 },
        { id: 3, name: 'Room B', capacity: 100 }
      ],
      contact_email: 'contact@techhub.com',
      contact_phone: '+91-9876543210',
      website: 'https://techhub.com',
      social_links: {
        twitter: '@techhub',
        linkedin: 'techhub'
      },
      status: 'active',
      images: ['https://example.com/venue1.jpg', 'https://example.com/venue1-2.jpg'],
      upcoming_events: [
        { id: 1, title: 'Tech Meetup 2024', date: '2024-02-15' }
      ],
      created_at: '2023-01-01T10:00:00Z',
      updated_at: '2024-01-15T12:00:00Z'
    }
  },

  // ============================================================
  // GET /api/venues/getVenueBySlug
  // ============================================================
  getVenueBySlug: {
    validSlug: 'tech-hub',
    nonExistentSlug: 'non-existent-venue',
    mockData: {
      id: 1,
      name: 'Tech Hub Conference Center',
      slug: 'tech-hub',
      status: 'active'
    }
  },

  // ============================================================
  // POST /api/venues/createVenue (Admin)
  // ============================================================
  createVenue: {
    validPayload: {
      payload: {
        name: 'New Event Space',
        slug: 'new-event-space',
        description: 'Brand new event space',
        address: '789 New Street',
        city: 'New City',
        state: 'State',
        country: 'India',
        postal_code: '789012',
        capacity: 150
      },
      expectedStatus: 201,
      expectedResponse: {
        id: 3,
        name: 'New Event Space',
        slug: 'new-event-space',
        status: 'active'
      }
    },
    minimalPayload: {
      payload: {
        name: 'Minimal Venue',
        slug: 'minimal-venue',
        address: '123 Address',
        city: 'City',
        country: 'India'
      },
      expectedStatus: 201
    },
    fullPayload: {
      payload: {
        name: 'Complete Venue',
        slug: 'complete-venue',
        description: 'Venue with all fields',
        address: '999 Complete Street',
        city: 'Complete City',
        state: 'State',
        country: 'India',
        postal_code: '999999',
        latitude: 12.9716,
        longitude: 77.5946,
        capacity: 1000,
        amenities: ['wifi', 'projector', 'parking', 'catering', 'ac'],
        contact_email: 'complete@venue.com',
        contact_phone: '+91-9876543212',
        website: 'https://completevenue.com',
        rooms: [
          { name: 'Hall A', capacity: 500 },
          { name: 'Hall B', capacity: 500 }
        ],
        images: ['https://example.com/complete.jpg']
      },
      expectedStatus: 201
    },
    missingName: {
      payload: {
        slug: 'no-name-venue',
        address: '123 Address',
        city: 'City',
        country: 'India'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    missingAddress: {
      payload: {
        name: 'No Address Venue',
        slug: 'no-address-venue',
        city: 'City',
        country: 'India'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    duplicateSlug: {
      payload: {
        name: 'Duplicate Slug Venue',
        slug: 'tech-hub', // Already exists
        address: '123 Address',
        city: 'City',
        country: 'India'
      },
      expectedStatus: 409,
      expectedError: 'DUPLICATE_ENTRY'
    },
    invalidCoordinates: {
      payload: {
        name: 'Invalid Coords Venue',
        slug: 'invalid-coords',
        address: '123 Address',
        city: 'City',
        country: 'India',
        latitude: 200, // Invalid
        longitude: 200 // Invalid
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // PUT /api/venues/updateVenue/:id (Admin)
  // ============================================================
  updateVenue: {
    validUpdate: {
      venueId: 1,
      payload: {
        name: 'Updated Tech Hub',
        description: 'Updated description',
        capacity: 600
      },
      expectedStatus: 200,
      expectedResponse: {
        id: 1,
        name: 'Updated Tech Hub',
        capacity: 600
      }
    },
    partialUpdate: {
      venueId: 1,
      payload: {
        description: 'Only updating description'
      },
      expectedStatus: 200
    },
    updateAmenities: {
      venueId: 1,
      payload: {
        amenities: ['wifi', 'projector', 'parking', 'catering', 'ac', 'audio-system']
      },
      expectedStatus: 200
    },
    updateRooms: {
      venueId: 1,
      payload: {
        rooms: [
          { name: 'Grand Hall', capacity: 400 },
          { name: 'Room A', capacity: 100 }
        ]
      },
      expectedStatus: 200
    },
    invalidId: {
      venueId: 99999,
      payload: {
        name: 'Updated Venue'
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    },
    duplicateSlug: {
      venueId: 1,
      payload: {
        slug: 'innovation-labs' // Already exists
      },
      expectedStatus: 409,
      expectedError: 'DUPLICATE_ENTRY'
    }
  },

  // ============================================================
  // DELETE /api/venues/deleteVenue/:id (Admin)
  // ============================================================
  deleteVenue: {
    validId: 2,
    nonExistentId: 99999,
    venueWithEvents: 1, // Cannot delete venue with upcoming events
    expectedResponse: {
      message: 'Venue deleted successfully'
    }
  },

  // ============================================================
  // GET /api/venues/getVenueAvailability
  // ============================================================
  getVenueAvailability: {
    validPayload: {
      venue_id: 1,
      date: '2024-02-15'
    },
    mockData: {
      venue_id: 1,
      date: '2024-02-15',
      available_slots: [
        { start: '09:00', end: '12:00', room: 'Main Hall' },
        { start: '14:00', end: '18:00', room: 'Room A' }
      ],
      booked_slots: [
        { start: '12:00', end: '14:00', room: 'Main Hall', event: 'Tech Meetup' }
      ]
    }
  },

  // ============================================================
  // POST /api/venues/bookVenue
  // ============================================================
  bookVenue: {
    validPayload: {
      payload: {
        venue_id: 1,
        event_id: 5,
        date: '2024-03-15',
        start_time: '09:00',
        end_time: '18:00',
        room_id: 1
      },
      expectedStatus: 200,
      expectedResponse: {
        message: 'Venue booked successfully',
        booking_id: 1
      }
    },
    conflictPayload: {
      payload: {
        venue_id: 1,
        event_id: 6,
        date: '2024-02-15', // Already booked
        start_time: '12:00',
        end_time: '14:00',
        room_id: 1
      },
      expectedStatus: 409,
      expectedError: 'BOOKING_CONFLICT'
    },
    invalidVenue: {
      payload: {
        venue_id: 99999,
        event_id: 5,
        date: '2024-03-15',
        start_time: '09:00',
        end_time: '18:00'
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    }
  },

  // ============================================================
  // GET /api/venues/search
  // ============================================================
  searchVenues: {
    validQuery: {
      query: 'tech',
      mockData: [
        { id: 1, name: 'Tech Hub Conference Center' }
      ]
    },
    byCity: {
      city: 'Tech City',
      mockData: [
        { id: 1, name: 'Tech Hub Conference Center', city: 'Tech City' }
      ]
    },
    byCapacity: {
      min_capacity: 300,
      mockData: [
        { id: 1, name: 'Tech Hub Conference Center', capacity: 500 }
      ]
    },
    byAmenities: {
      amenities: ['wifi', 'projector'],
      mockData: [
        { id: 1, name: 'Tech Hub Conference Center' }
      ]
    },
    noResults: {
      query: 'nonexistent',
      mockData: []
    }
  },

  // ============================================================
  // GET /api/venues/getNearbyVenues
  // ============================================================
  getNearbyVenues: {
    validPayload: {
      latitude: 12.9716,
      longitude: 77.5946,
      radius: 10 // km
    },
    mockData: [
      { id: 1, name: 'Tech Hub Conference Center', distance: 2.5 },
      { id: 2, name: 'Innovation Labs', distance: 5.8 }
    ]
  },

  // ============================================================
  // Shared Test Data
  // ============================================================
  validStatuses: ['active', 'inactive', 'under_maintenance'],
  validAmenities: ['wifi', 'projector', 'parking', 'catering', 'ac', 'audio-system', 'video-conferencing', 'whiteboard'],
  requiredFields: ['name', 'slug', 'address', 'city', 'country'],
  maxLengths: {
    name: 255,
    slug: 100,
    description: 5000,
    address: 500
  },
  coordinateRanges: {
    latitude: { min: -90, max: 90 },
    longitude: { min: -180, max: 180 }
  }
};
