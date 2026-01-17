/**
 * GetUserRegistrations Service
 * Returns event registrations for the current user
 * Matches Rails API: GET /api/user/registrations
 */
const { EventRegistration, Event, Chapter, EventType, Venue } = require('../../../shared/models');

/**
 * Get user's event registrations
 * @param {Object} data - Request data
 * @param {number} data.userId - User ID from JWT
 * @param {number} [data.eventId] - Optional event ID to filter registrations
 * @returns {Promise<Array>} - List of registrations
 */
const getUserRegistrations = async ({ userId, eventId }) => {
  const where = { user_id: userId };

  // Optional filter by event ID (matches Rails: params[:event_id])
  if (eventId) {
    where.event_id = eventId;
  }

  const registrations = await EventRegistration.findAll({
    where,
    include: [
      {
        model: Event,
        as: 'event',
        include: [
          { model: Chapter, as: 'chapter', attributes: ['id', 'name'] },
          { model: EventType, as: 'eventType', attributes: ['id', 'name'] },
          { model: Venue, as: 'venue', attributes: ['id', 'name', 'address'] }
        ]
      }
    ],
    order: [['created_at', 'DESC']]
  });

  return registrations.map(reg => ({
    id: reg.id,
    event_id: reg.event_id,
    user_id: reg.user_id,
    state: reg.state,
    accepted: reg.accepted,
    visible: reg.visible,
    created_at: reg.created_at,
    updated_at: reg.updated_at,
    event: reg.event ? {
      id: reg.event.id,
      name: reg.event.name,
      description: reg.event.description,
      start_time: reg.event.start_time,
      end_time: reg.event.end_time,
      chapter: reg.event.chapter,
      event_type: reg.event.eventType,
      venue: reg.event.venue
    } : null
  }));
};

module.exports = getUserRegistrations;
