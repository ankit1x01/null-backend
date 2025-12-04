/**
 * GetUserSessions Service
 * Returns sessions delivered by the current user
 */
const { EventSession, Event, Chapter } = require('../../../shared/models');

/**
 * Get user's delivered sessions
 * @param {Object} data - Request data
 * @param {number} data.userId - User ID from JWT
 * @returns {Promise<Array>} - List of sessions
 */
const getUserSessions = async ({ userId }) => {
  const sessions = await EventSession.findAll({
    where: {
      user_id: userId,
      placeholder: false
    },
    include: [
      {
        model: Event,
        as: 'event',
        attributes: ['id', 'name', 'start_time', 'end_time'],
        include: [
          { model: Chapter, as: 'chapter', attributes: ['id', 'name'] }
        ]
      }
    ],
    order: [['start_time', 'DESC']]
  });

  return sessions.map(session => ({
    id: session.id,
    name: session.name,
    description: session.description,
    session_type: session.session_type,
    start_time: session.start_time,
    end_time: session.end_time,
    presentation_url: session.presentation_url,
    video_url: session.video_url,
    votes_up: session.cached_votes_up,
    votes_down: session.cached_votes_down,
    event: {
      id: session.event.id,
      name: session.event.name,
      start_time: session.event.start_time,
      end_time: session.event.end_time,
      chapter: session.event.chapter
    }
  }));
};

module.exports = getUserSessions;
