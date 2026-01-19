/**
 * Registrations Fixture Data
 * Event registration mock data for testing
 */

module.exports = {
  // Valid registration entities
  confirmedRegistration: {
    id: 1,
    event_id: 1,
    user_id: 2,
    status: 'confirmed',
    attended: false,
    check_in_time: null,
    notes: null,
    created_at: new Date('2024-01-20'),
    updated_at: new Date('2024-01-20')
  },

  attendedRegistration: {
    id: 2,
    event_id: 2,
    user_id: 2,
    status: 'confirmed',
    attended: true,
    check_in_time: new Date('2024-01-15 10:00:00'),
    notes: 'Checked in on time',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-15')
  },

  waitlistedRegistration: {
    id: 3,
    event_id: 1,
    user_id: 4,
    status: 'waitlisted',
    attended: false,
    check_in_time: null,
    notes: null,
    created_at: new Date('2024-01-25'),
    updated_at: new Date('2024-01-25')
  },

  cancelledRegistration: {
    id: 4,
    event_id: 1,
    user_id: 5,
    status: 'cancelled',
    attended: false,
    check_in_time: null,
    notes: 'User cancelled',
    created_at: new Date('2024-01-22'),
    updated_at: new Date('2024-01-23')
  },

  // Create registration payloads
  createRegistrationValid: {
    event_id: 1,
    user_id: 3
  },

  createRegistrationWithNotes: {
    event_id: 1,
    user_id: 3,
    notes: 'First time attendee'
  },

  createRegistrationDuplicate: {
    event_id: 1,
    user_id: 2 // Already registered
  },

  createRegistrationInvalidEvent: {
    event_id: 9999,
    user_id: 2
  },

  createRegistrationClosedEvent: {
    event_id: 2, // Past event
    user_id: 3
  },

  // Update registration payloads
  updateRegistrationStatus: {
    status: 'confirmed'
  },

  updateRegistrationAttended: {
    attended: true,
    check_in_time: new Date().toISOString()
  },

  updateRegistrationNotes: {
    notes: 'VIP attendee'
  },

  // Mass update payload
  massUpdateRegistrations: {
    registration_ids: [1, 2, 3],
    status: 'confirmed'
  },

  massUpdateAttendance: {
    registration_ids: [1, 2],
    attended: true,
    check_in_time: new Date().toISOString()
  },

  // Registration list
  registrationList: [
    { id: 1, event_id: 1, user_id: 2, status: 'confirmed', attended: false },
    { id: 2, event_id: 1, user_id: 3, status: 'confirmed', attended: false },
    { id: 3, event_id: 1, user_id: 4, status: 'waitlisted', attended: false },
    { id: 4, event_id: 1, user_id: 5, status: 'cancelled', attended: false },
    { id: 5, event_id: 2, user_id: 2, status: 'confirmed', attended: true }
  ]
};
