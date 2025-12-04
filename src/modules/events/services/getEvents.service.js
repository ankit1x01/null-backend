/**
 * GetEvents Service
 * Returns list of events with pagination
 */
const { Event, Chapter, EventType, Venue, sequelize } = require('../../../shared/models');
const { Op } = sequelize.Sequelize;

/**
 * Get list of events
 * @param {Object} data - Request data
 * @param {number} data.page - Page number (0-indexed)
 * @param {number} data.per_page - Items per page
 * @param {boolean} data.all - Include past events
 * @returns {Promise<Object>} - Paginated events list
 */
const getEvents = async ({ page = 0, per_page = 20, all = false }) => {
  const limit = Math.min(per_page, 100); // Max 100 per page
  const offset = page * limit;

  // Build where clause
  const where = { public: true };
  if (!all) {
    where.end_time = { [Op.gt]: new Date() };
  }

  const { count, rows } = await Event.findAndCountAll({
    where,
    include: [
      {
        model: Chapter,
        as: 'chapter',
        attributes: ['id', 'name', 'city', 'country']
      },
      {
        model: EventType,
        as: 'eventType',
        attributes: ['id', 'name']
      },
      {
        model: Venue,
        as: 'venue',
        attributes: ['id', 'name', 'address']
      }
    ],
    limit,
    offset,
    order: [['start_time', all ? 'DESC' : 'ASC']]
  });

  return {
    events: rows.map(event => ({
      id: event.id,
      name: event.name,
      description: event.description,
      start_time: event.start_time,
      end_time: event.end_time,
      chapter: event.chapter,
      event_type: event.eventType,
      venue: event.venue,
      accepting_registration: event.accepting_registration,
      registration_start_time: event.registration_start_time,
      registration_end_time: event.registration_end_time,
      public: event.public,
      slug: event.slug
    })),
    pagination: {
      page,
      per_page: limit,
      total: count,
      total_pages: Math.ceil(count / limit)
    }
  };
};

module.exports = getEvents;
