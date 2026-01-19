/**
 * Chapters Module - Test Data
 * Contains all test data, payloads, and expected responses for chapters API tests
 */

module.exports = {
  // ============================================================
  // GET /api/chapters/getChapters
  // ============================================================
  getChapters: {
    mockData: [
      {
        id: 1,
        name: 'Tech City Chapter',
        slug: 'tech-city',
        description: 'A technology focused community chapter',
        location: 'Tech City',
        country: 'India',
        timezone: 'Asia/Kolkata',
        status: 'active',
        members_count: 150,
        events_count: 25,
        logo_url: 'https://example.com/logo1.png',
        banner_url: 'https://example.com/banner1.png',
        created_at: '2023-01-15T10:00:00Z',
        updated_at: '2024-01-20T15:30:00Z'
      },
      {
        id: 2,
        name: 'Digital Hub Chapter',
        slug: 'digital-hub',
        description: 'Innovation and digital transformation community',
        location: 'Digital City',
        country: 'USA',
        timezone: 'America/New_York',
        status: 'active',
        members_count: 200,
        events_count: 40,
        logo_url: 'https://example.com/logo2.png',
        banner_url: 'https://example.com/banner2.png',
        created_at: '2022-06-10T08:00:00Z',
        updated_at: '2024-01-18T12:00:00Z'
      }
    ],
    paginatedMockData: {
      rows: [
        { id: 1, name: 'Tech City Chapter', slug: 'tech-city' }
      ],
      count: 10,
      totalPages: 2,
      currentPage: 1
    },
    filteredByStatus: {
      mockData: [
        { id: 1, name: 'Tech City Chapter', status: 'active' }
      ]
    },
    filteredByCountry: {
      mockData: [
        { id: 2, name: 'Digital Hub Chapter', country: 'USA' }
      ]
    },
    sortedByName: {
      mockData: [
        { id: 2, name: 'Digital Hub Chapter' },
        { id: 1, name: 'Tech City Chapter' }
      ]
    }
  },

  // ============================================================
  // GET /api/chapters/getChapterById
  // ============================================================
  getChapterById: {
    validId: 1,
    nonExistentId: 99999,
    mockData: {
      id: 1,
      name: 'Tech City Chapter',
      slug: 'tech-city',
      description: 'A technology focused community chapter',
      location: 'Tech City',
      country: 'India',
      timezone: 'Asia/Kolkata',
      status: 'active',
      members_count: 150,
      events_count: 25,
      logo_url: 'https://example.com/logo1.png',
      banner_url: 'https://example.com/banner1.png',
      social_links: {
        twitter: 'https://twitter.com/techcity',
        linkedin: 'https://linkedin.com/company/techcity'
      },
      leads: [
        { id: 1, name: 'John Admin', role: 'Chapter Lead' },
        { id: 2, name: 'Jane Manager', role: 'Co-Lead' }
      ],
      created_at: '2023-01-15T10:00:00Z',
      updated_at: '2024-01-20T15:30:00Z'
    },
    detailedMockData: {
      id: 1,
      name: 'Tech City Chapter',
      events: [
        { id: 1, title: 'Monthly Meetup' },
        { id: 2, title: 'Workshop Session' }
      ],
      members: [
        { id: 1, name: 'Member 1' }
      ]
    }
  },

  // ============================================================
  // GET /api/chapters/getChapterBySlug
  // ============================================================
  getChapterBySlug: {
    validSlug: 'tech-city',
    nonExistentSlug: 'non-existent-chapter',
    invalidSlug: 'invalid slug with spaces!@#',
    mockData: {
      id: 1,
      name: 'Tech City Chapter',
      slug: 'tech-city',
      description: 'A technology focused community chapter',
      status: 'active'
    }
  },

  // ============================================================
  // POST /api/chapters/createChapter (Admin)
  // ============================================================
  createChapter: {
    validPayload: {
      payload: {
        name: 'New Chapter',
        slug: 'new-chapter',
        description: 'A brand new community chapter',
        location: 'New City',
        country: 'India',
        timezone: 'Asia/Kolkata'
      },
      expectedStatus: 201,
      expectedResponse: {
        id: 3,
        name: 'New Chapter',
        slug: 'new-chapter',
        status: 'pending'
      }
    },
    minimalPayload: {
      payload: {
        name: 'Minimal Chapter',
        slug: 'minimal-chapter',
        location: 'Somewhere'
      },
      expectedStatus: 201
    },
    fullPayload: {
      payload: {
        name: 'Complete Chapter',
        slug: 'complete-chapter',
        description: 'Full chapter with all fields',
        location: 'Full City',
        country: 'USA',
        timezone: 'America/New_York',
        logo_url: 'https://example.com/logo.png',
        banner_url: 'https://example.com/banner.png',
        social_links: {
          twitter: 'https://twitter.com/newchapter',
          linkedin: 'https://linkedin.com/company/newchapter',
          github: 'https://github.com/newchapter'
        }
      },
      expectedStatus: 201
    },
    missingName: {
      payload: {
        slug: 'no-name-chapter',
        location: 'Test City'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    missingSlug: {
      payload: {
        name: 'No Slug Chapter',
        location: 'Test City'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    duplicateSlug: {
      payload: {
        name: 'Duplicate Slug Chapter',
        slug: 'tech-city', // Already exists
        location: 'Test City'
      },
      expectedStatus: 409,
      expectedError: 'DUPLICATE_ENTRY'
    },
    invalidSlug: {
      payload: {
        name: 'Invalid Slug Chapter',
        slug: 'Invalid Slug With Spaces',
        location: 'Test City'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    nameTooLong: {
      payload: {
        name: 'A'.repeat(256),
        slug: 'name-too-long',
        location: 'Test City'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    },
    invalidTimezone: {
      payload: {
        name: 'Invalid Timezone Chapter',
        slug: 'invalid-timezone',
        location: 'Test City',
        timezone: 'Invalid/Timezone'
      },
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // PUT /api/chapters/updateChapter/:id (Admin)
  // ============================================================
  updateChapter: {
    validUpdate: {
      chapterId: 1,
      payload: {
        name: 'Updated Tech City Chapter',
        description: 'Updated description for the chapter',
        location: 'New Tech City'
      },
      expectedStatus: 200,
      expectedResponse: {
        id: 1,
        name: 'Updated Tech City Chapter',
        description: 'Updated description for the chapter'
      }
    },
    partialUpdate: {
      chapterId: 1,
      payload: {
        description: 'Only updating description'
      },
      expectedStatus: 200
    },
    updateStatus: {
      chapterId: 1,
      payload: {
        status: 'inactive'
      },
      expectedStatus: 200
    },
    updateSocialLinks: {
      chapterId: 1,
      payload: {
        social_links: {
          twitter: 'https://twitter.com/newtechcity',
          discord: 'https://discord.gg/techcity'
        }
      },
      expectedStatus: 200
    },
    invalidId: {
      chapterId: 99999,
      payload: {
        name: 'Updated Chapter'
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    },
    duplicateSlug: {
      chapterId: 1,
      payload: {
        slug: 'digital-hub' // Already exists for chapter 2
      },
      expectedStatus: 409,
      expectedError: 'DUPLICATE_ENTRY'
    },
    emptyPayload: {
      chapterId: 1,
      payload: {},
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // DELETE /api/chapters/deleteChapter/:id (Admin)
  // ============================================================
  deleteChapter: {
    validId: 2,
    nonExistentId: 99999,
    chapterWithEvents: 1, // Cannot delete chapter with events
    expectedResponse: {
      message: 'Chapter deleted successfully'
    }
  },

  // ============================================================
  // GET /api/chapters/getChapterMembers
  // ============================================================
  getChapterMembers: {
    validChapterId: 1,
    nonExistentChapterId: 99999,
    mockData: [
      {
        id: 1,
        user_id: 10,
        chapter_id: 1,
        name: 'Member One',
        email: 'member1@example.com',
        role: 'member',
        joined_at: '2023-03-15T10:00:00Z'
      },
      {
        id: 2,
        user_id: 11,
        chapter_id: 1,
        name: 'Member Two',
        email: 'member2@example.com',
        role: 'lead',
        joined_at: '2023-01-10T08:00:00Z'
      }
    ],
    paginatedMockData: {
      rows: [
        { id: 1, name: 'Member One', role: 'member' }
      ],
      count: 150,
      totalPages: 15,
      currentPage: 1
    }
  },

  // ============================================================
  // POST /api/chapters/joinChapter
  // ============================================================
  joinChapter: {
    validPayload: {
      payload: {
        chapter_id: 1
      },
      expectedStatus: 200,
      expectedResponse: {
        message: 'Successfully joined chapter'
      }
    },
    alreadyMember: {
      payload: {
        chapter_id: 1
      },
      expectedStatus: 409,
      expectedError: 'ALREADY_MEMBER'
    },
    invalidChapter: {
      payload: {
        chapter_id: 99999
      },
      expectedStatus: 404,
      expectedError: 'NOT_FOUND'
    },
    missingChapterId: {
      payload: {},
      expectedStatus: 400,
      expectedError: 'VALIDATION_ERROR'
    }
  },

  // ============================================================
  // POST /api/chapters/leaveChapter
  // ============================================================
  leaveChapter: {
    validPayload: {
      payload: {
        chapter_id: 1
      },
      expectedStatus: 200,
      expectedResponse: {
        message: 'Successfully left chapter'
      }
    },
    notMember: {
      payload: {
        chapter_id: 2
      },
      expectedStatus: 404,
      expectedError: 'NOT_MEMBER'
    },
    leadCannotLeave: {
      payload: {
        chapter_id: 1
      },
      expectedStatus: 403,
      expectedError: 'LEAD_CANNOT_LEAVE'
    }
  },

  // ============================================================
  // GET /api/chapters/getChapterEvents
  // ============================================================
  getChapterEvents: {
    validChapterId: 1,
    nonExistentChapterId: 99999,
    mockData: [
      {
        id: 1,
        title: 'Monthly Tech Meetup',
        chapter_id: 1,
        date: '2024-02-15T18:00:00Z',
        status: 'upcoming',
        registrations_count: 45
      },
      {
        id: 2,
        title: 'Workshop: Introduction to AI',
        chapter_id: 1,
        date: '2024-02-20T14:00:00Z',
        status: 'upcoming',
        registrations_count: 30
      }
    ],
    upcomingEvents: {
      filter: 'upcoming',
      mockData: [
        { id: 1, title: 'Monthly Tech Meetup', status: 'upcoming' }
      ]
    },
    pastEvents: {
      filter: 'past',
      mockData: [
        { id: 3, title: 'Previous Workshop', status: 'completed' }
      ]
    }
  },

  // ============================================================
  // GET /api/chapters/getChapterStats
  // ============================================================
  getChapterStats: {
    validChapterId: 1,
    mockData: {
      total_members: 150,
      total_events: 25,
      total_registrations: 1500,
      active_events: 3,
      events_this_month: 2,
      new_members_this_month: 15,
      growth_rate: 12.5,
      top_speakers: [
        { id: 1, name: 'Speaker One', sessions: 10 }
      ]
    }
  },

  // ============================================================
  // Shared Test Data
  // ============================================================
  validStatuses: ['active', 'inactive', 'pending', 'archived'],
  validTimezones: ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'UTC'],
  requiredFields: ['name', 'slug', 'location'],
  maxLengths: {
    name: 255,
    slug: 100,
    description: 5000,
    location: 255
  }
};
