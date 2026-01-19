/**
 * Events Fixture Data
 * Event mock data for testing
 */

const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
const pastDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

module.exports = {
  // Valid event entities
  upcomingEvent: {
    id: 1,
    name: 'Null Pune Monthly Meetup',
    slug: 'null-pune-monthly-meetup-jan-2026',
    description: 'Monthly security meetup discussing latest trends',
    chapter_id: 1,
    venue_id: 1,
    event_type_id: 1,
    start_time: new Date(futureDate),
    end_time: new Date(futureDate.getTime() + 3 * 60 * 60 * 1000),
    registration_start_time: new Date(Date.now() - 24 * 60 * 60 * 1000),
    registration_end_time: new Date(futureDate.getTime() - 60 * 60 * 1000),
    max_registrations: 100,
    published: true,
    cancelled: false,
    image: null,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },

  pastEvent: {
    id: 2,
    name: 'Past Security Workshop',
    slug: 'past-security-workshop',
    description: 'Workshop that already happened',
    chapter_id: 1,
    venue_id: 1,
    event_type_id: 2,
    start_time: pastDate,
    end_time: new Date(pastDate.getTime() + 4 * 60 * 60 * 1000),
    registration_start_time: new Date(pastDate.getTime() - 14 * 24 * 60 * 60 * 1000),
    registration_end_time: new Date(pastDate.getTime() - 24 * 60 * 60 * 1000),
    max_registrations: 50,
    published: true,
    cancelled: false,
    image: 'event.jpg',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },

  unpublishedEvent: {
    id: 3,
    name: 'Draft Event',
    slug: 'draft-event',
    description: 'Event in draft state',
    chapter_id: 1,
    venue_id: 1,
    event_type_id: 1,
    start_time: futureDate,
    end_time: new Date(futureDate.getTime() + 2 * 60 * 60 * 1000),
    registration_start_time: null,
    registration_end_time: null,
    max_registrations: null,
    published: false,
    cancelled: false,
    image: null,
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01')
  },

  cancelledEvent: {
    id: 4,
    name: 'Cancelled Event',
    slug: 'cancelled-event',
    description: 'This event was cancelled',
    chapter_id: 1,
    venue_id: 1,
    event_type_id: 1,
    start_time: futureDate,
    end_time: new Date(futureDate.getTime() + 2 * 60 * 60 * 1000),
    registration_start_time: new Date(),
    registration_end_time: futureDate,
    max_registrations: 100,
    published: true,
    cancelled: true,
    image: null,
    created_at: new Date('2024-02-15'),
    updated_at: new Date('2024-02-15')
  },

  // Create event payloads
  createEventValid: {
    name: 'New Security Conference',
    description: 'Annual security conference',
    chapter_id: 1,
    venue_id: 1,
    event_type_id: 1,
    start_time: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
    registration_start_time: new Date().toISOString(),
    registration_end_time: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
    max_registrations: 200,
    published: true
  },

  createEventMinimal: {
    name: 'Minimal Event',
    chapter_id: 1,
    start_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString()
  },

  createEventInvalidDates: {
    name: 'Invalid Dates Event',
    chapter_id: 1,
    start_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // End before start
  },

  createEventPastDate: {
    name: 'Past Date Event',
    chapter_id: 1,
    start_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
  },

  createEventMissingRequired: {
    description: 'Missing name and chapter'
  },

  // Update event payloads
  updateEventValid: {
    name: 'Updated Event Name',
    description: 'Updated event description',
    max_registrations: 150
  },

  updateEventPartial: {
    description: 'Only updating description'
  },

  // Event list for pagination
  eventList: [
    { id: 1, name: 'Event 1', chapter_id: 1, published: true },
    { id: 2, name: 'Event 2', chapter_id: 1, published: true },
    { id: 3, name: 'Event 3', chapter_id: 2, published: true },
    { id: 4, name: 'Event 4', chapter_id: 2, published: false },
    { id: 5, name: 'Event 5', chapter_id: 1, published: true }
  ]
};
