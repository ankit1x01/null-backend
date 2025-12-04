/**
 * GetUserEvents Service
 * Returns events registered by the current user
 */
const { EventRegistration, Event, Chapter, EventType, Venue } = require('../../../shared/models');

/**
 * Get user's registered events
 * @param {Object} data - Request data
 * @param {number} data.userId - User ID from JWT
 * @returns {Promise<Array>} - List of events
 */
const getUserEvents = async ({ userId }) => {
  const registrations = await EventRegistration.findAll({
    where: { user_id: userId },
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
    registration_id: reg.id,
    registration_state: reg.state,
    registration_accepted: reg.accepted,
    registration_visible: reg.visible,
    registered_at: reg.created_at,
    event: {
      id: reg.event.id,
      name: reg.event.name,
      description: reg.event.description,
      start_time: reg.event.start_time,
      end_time: reg.event.end_time,
      chapter: reg.event.chapter,
      event_type: reg.event.eventType,
      venue: reg.event.venue,
      accepting_registration: reg.event.accepting_registration,
      public: reg.event.public
    }
  }));
};

module.exports = getUserEvents;
