/**
 * DislikeSession Service
 * Dislike/downvote a session (similar to acts_as_votable in Rails)
 * Matches Rails: POST /event_sessions/:id/dislike
 */
const { EventLike, EventSession } = require('../../../shared/models');

/**
 * Dislike a session
 * @param {Object} data - Request data
 * @param {number} data.sessionId - Event Session ID
 * @param {number} data.userId - User ID from JWT
 * @returns {Promise<Object>} - Result of the dislike action
 */
const dislikeSession = async ({ sessionId, userId }) => {
  // Verify session exists
  const session = await EventSession.findByPk(sessionId);
  if (!session) {
    throw new Error(JSON.stringify({
      code: 'SESS0404',
      statusCode: 404,
      message: 'Session not found'
    }));
  }

  // Check if user already has a like/dislike on this session
  const existingLike = await EventLike.findOne({
    where: {
      event_session_id: sessionId,
      user_id: userId
    }
  });

  if (existingLike) {
    if (existingLike.like_type === 'dislike') {
      // User already disliked, remove the dislike (toggle)
      await existingLike.destroy();
      return {
        action: 'removed',
        session_id: sessionId,
        like_type: null,
        message: 'Dislike removed'
      };
    } else {
      // User had a like, change to dislike
      existingLike.like_type = 'dislike';
      await existingLike.save();
      return {
        action: 'updated',
        session_id: sessionId,
        like_type: 'dislike',
        message: 'Changed from like to dislike'
      };
    }
  } else {
    // Create new dislike
    await EventLike.create({
      event_session_id: sessionId,
      user_id: userId,
      like_type: 'dislike'
    });
    return {
      action: 'created',
      session_id: sessionId,
      like_type: 'dislike',
      message: 'Session disliked'
    };
  }
};

module.exports = dislikeSession;
