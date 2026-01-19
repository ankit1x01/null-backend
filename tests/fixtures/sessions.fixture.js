/**
 * Sessions Fixture Data
 * Event session mock data for testing
 */

const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

module.exports = {
  // Valid session entities
  confirmedSession: {
    id: 1,
    event_id: 1,
    user_id: 3,
    title: 'Introduction to Web Security',
    description: 'Learn the basics of web application security',
    start_time: futureDate,
    end_time: new Date(futureDate.getTime() + 45 * 60 * 1000),
    status: 'confirmed',
    slides_url: 'https://slides.example.com/websec',
    video_url: null,
    image: null,
    level: 'beginner',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },

  pendingSession: {
    id: 2,
    event_id: 1,
    user_id: 2,
    title: 'Advanced Penetration Testing',
    description: 'Deep dive into penetration testing techniques',
    start_time: new Date(futureDate.getTime() + 60 * 60 * 1000),
    end_time: new Date(futureDate.getTime() + 105 * 60 * 1000),
    status: 'pending',
    slides_url: null,
    video_url: null,
    image: null,
    level: 'advanced',
    created_at: new Date('2024-01-05'),
    updated_at: new Date('2024-01-05')
  },

  rejectedSession: {
    id: 3,
    event_id: 1,
    user_id: 4,
    title: 'Rejected Talk',
    description: 'This talk was rejected',
    start_time: null,
    end_time: null,
    status: 'rejected',
    slides_url: null,
    video_url: null,
    image: null,
    level: 'intermediate',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-15')
  },

  // Create session payloads
  createSessionValid: {
    event_id: 1,
    user_id: 3,
    title: 'New Security Talk',
    description: 'An exciting new talk about security',
    start_time: new Date(futureDate.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(futureDate.getTime() + 2.75 * 60 * 60 * 1000).toISOString(),
    level: 'intermediate'
  },

  createSessionMinimal: {
    event_id: 1,
    user_id: 2,
    title: 'Minimal Session'
  },

  createSessionInvalidEvent: {
    event_id: 9999, // Non-existent event
    user_id: 2,
    title: 'Invalid Event Session'
  },

  createSessionMissingRequired: {
    description: 'Missing title and event_id'
  },

  // Update session payloads
  updateSessionValid: {
    title: 'Updated Session Title',
    description: 'Updated session description',
    status: 'confirmed'
  },

  updateSessionStatus: {
    status: 'confirmed'
  },

  updateSessionUrls: {
    slides_url: 'https://slides.example.com/new',
    video_url: 'https://youtube.com/watch?v=abc123'
  },

  // Session list
  sessionList: [
    { id: 1, title: 'Session 1', event_id: 1, status: 'confirmed' },
    { id: 2, title: 'Session 2', event_id: 1, status: 'pending' },
    { id: 3, title: 'Session 3', event_id: 1, status: 'rejected' },
    { id: 4, title: 'Session 4', event_id: 2, status: 'confirmed' },
    { id: 5, title: 'Session 5', event_id: 2, status: 'confirmed' }
  ]
};
