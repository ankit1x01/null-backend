/**
 * GetEventById Service
 * Returns single event with full details
 */
const { Event, Chapter, EventType, Venue, EventSession, User } = require('../../../shared/models');

/**
 * Get event by ID
 * @param {Object} data - Request data
 * @param {number} data.eventId - Event ID
 * @returns {Promise<Object>} - Event details
 */
const getEventById = async ({ eventId }) => {
  const event = await Event.findByPk(eventId, {
    include: [
      {
        model: Chapter,
        as: 'chapter',
        attributes: ['id', 'name', 'description', 'city', 'country']
      },
      {
        model: EventType,
        as: 'eventType',
        attributes: ['id', 'name', 'description']
      },
      {
        model: Venue,
        as: 'venue',
        attributes: ['id', 'name', 'address', 'map_url', 'contact_name']
      },
      {
        model: EventSession,
        as: 'eventSessions',
        where: { placeholder: false },
        required: false,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'avatar', 'handle']
          }
        ],
        order: [['start_time', 'ASC']]
      }
    ]
  });

  if (!event) {
    throw new Error(JSON.stringify({
      code: 'EVENT0001',
      statusCode: 404,
      message: 'Event not found'
    }));
  }

  return {
    id: event.id,
    name: event.name,
    description: event.description,
    start_time: event.start_time,
    end_time: event.end_time,
    registration_start_time: event.registration_start_time,
    registration_end_time: event.registration_end_time,
    registration_instructions: event.registration_instructions,
    accepting_registration: event.accepting_registration,
    max_registration: event.max_registration,
    public: event.public,
    slug: event.slug,
    image: event.image,
    chapter: event.chapter,
    event_type: event.eventType,
    venue: event.venue,
    sessions: event.eventSessions?.map(session => ({
      id: session.id,
      name: session.name,
      description: session.description,
      session_type: session.session_type,
      start_time: session.start_time,
      end_time: session.end_time,
      presentation_url: session.presentation_url,
      video_url: session.video_url,
      speaker: session.user
    })) || []
  };
};

module.exports = getEventById;
