/**
 * GetMySessions Service
 * Returns sessions where user is the speaker
 * Matches Rails: GET /event_sessions/my_sessions
 */
const { EventSession, Event, Chapter, Venue, User } = require('../../../shared/models');

/**
 * Get user's sessions as speaker
 * @param {Object} data - Request data
 * @param {number} data.userId - User ID from JWT
 * @returns {Promise<Array>} - List of sessions
 */
const getMySessions = async ({ userId }) => {
  const sessions = await EventSession.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Event,
        as: 'event',
        include: [
          { model: Chapter, as: 'chapter', attributes: ['id', 'name'] },
          { model: Venue, as: 'venue', attributes: ['id', 'name', 'address'] }
        ]
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'avatar']
      }
    ],
    order: [['start_time', 'DESC']]
  });

  return sessions.map(session => ({
    id: session.id,
    event_id: session.event_id,
    user_id: session.user_id,
    title: session.title,
    description: session.description,
    start_time: session.start_time,
    end_time: session.end_time,
    session_type: session.session_type,
    level: session.level,
    slides_url: session.slides_url,
    video_url: session.video_url,
    created_at: session.created_at,
    updated_at: session.updated_at,
    event: session.event ? {
      id: session.event.id,
      name: session.event.name,
      start_time: session.event.start_time,
      end_time: session.event.end_time,
      chapter: session.event.chapter,
      venue: session.event.venue
    } : null,
    speaker: session.user ? {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      avatar: session.user.avatar
    } : null
  }));
};

module.exports = getMySessions;
