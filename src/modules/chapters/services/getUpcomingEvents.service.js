/**
 * GetUpcomingEvents Service
 * Returns upcoming events for a chapter
 * Matches Rails: GET /chapters/:id/upcoming_events
 */
const { Event, Chapter, EventType, Venue } = require('../../../shared/models');
const { Op } = require('sequelize');

/**
 * Get upcoming events for a chapter
 * @param {Object} data - Request data
 * @param {number} data.chapterId - Chapter ID
 * @returns {Promise<Array>} - List of upcoming events
 */
const getUpcomingEvents = async ({ chapterId }) => {
  // Verify chapter exists
  const chapter = await Chapter.findByPk(chapterId);
  if (!chapter) {
    throw new Error(JSON.stringify({
      code: 'CHPT0404',
      statusCode: 404,
      message: 'Chapter not found'
    }));
  }

  const events = await Event.findAll({
    where: {
      chapter_id: chapterId,
      start_time: { [Op.gte]: new Date() },
      public: true
    },
    include: [
      { model: EventType, as: 'eventType', attributes: ['id', 'name'] },
      { model: Venue, as: 'venue', attributes: ['id', 'name', 'address', 'city'] }
    ],
    order: [['start_time', 'ASC']],
    limit: 10
  });

  return events.map(event => ({
    id: event.id,
    name: event.name,
    description: event.description,
    start_time: event.start_time,
    end_time: event.end_time,
    registration_start_time: event.registration_start_time,
    registration_end_time: event.registration_end_time,
    accepting_registration: event.accepting_registration,
    public: event.public,
    event_type: event.eventType,
    venue: event.venue,
    created_at: event.created_at
  }));
};

module.exports = getUpcomingEvents;
