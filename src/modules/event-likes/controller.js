/**
 * Event Likes Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

/**
 * Get likes for a session
 */
const getSessionLikes = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const likes = await service.getLikesBySession(sessionId);
    return successResponse(res, 'Session likes retrieved', likes);
  } catch (error) {
    console.error('Error fetching session likes:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get like counts for a session
 */
const getSessionLikeCounts = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const counts = await service.getSessionLikeCounts(sessionId);
    return successResponse(res, 'Like counts retrieved', counts);
  } catch (error) {
    console.error('Error fetching like counts:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Toggle like on a session
 */
const toggleLike = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { like_type = 'like' } = req.body;
    const userId = req.user.id;

    const result = await service.toggleLike(sessionId, userId, like_type);
    return successResponse(res, `Like ${result.action}`, result);
  } catch (error) {
    console.error('Error toggling like:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Add like to a session
 */
const addLike = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { like_type = 'like' } = req.body;
    const userId = req.user.id;

    const like = await service.addLike(sessionId, userId, like_type);
    return successResponse(res, 'Like added', like, 201);
  } catch (error) {
    console.error('Error adding like:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Remove like from a session
 */
const removeLike = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const removed = await service.removeLike(sessionId, userId);
    if (!removed) {
      return errorResponse(res, 'Like not found', 404);
    }
    return successResponse(res, 'Like removed');
  } catch (error) {
    console.error('Error removing like:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get user's likes
 */
const getUserLikes = async (req, res) => {
  try {
    const userId = req.user.id;
    const likes = await service.getLikesByUser(userId);
    return successResponse(res, 'User likes retrieved', likes);
  } catch (error) {
    console.error('Error fetching user likes:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get user's like for a specific session
 */
const getUserSessionLike = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;
    const like = await service.getUserLike(sessionId, userId);
    return successResponse(res, 'User session like retrieved', like);
  } catch (error) {
    console.error('Error fetching user session like:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get top liked sessions for an event
 */
const getTopLikedSessions = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { limit = 10 } = req.query;
    const sessions = await service.getTopLikedSessions(eventId, parseInt(limit));
    return successResponse(res, 'Top liked sessions retrieved', sessions);
  } catch (error) {
    console.error('Error fetching top liked sessions:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get reactions for multiple sessions
 */
const getSessionsReactions = async (req, res) => {
  try {
    const { sessionIds } = req.body;
    if (!sessionIds || !Array.isArray(sessionIds)) {
      return errorResponse(res, 'sessionIds array is required', 400);
    }
    const reactions = await service.getSessionsReactions(sessionIds);
    return successResponse(res, 'Sessions reactions retrieved', reactions);
  } catch (error) {
    console.error('Error fetching sessions reactions:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get user's likes for multiple sessions
 */
const getUserLikesForSessions = async (req, res) => {
  try {
    const { sessionIds } = req.body;
    const userId = req.user.id;

    if (!sessionIds || !Array.isArray(sessionIds)) {
      return errorResponse(res, 'sessionIds array is required', 400);
    }

    const likes = await service.getUserLikesForSessions(sessionIds, userId);
    return successResponse(res, 'User likes for sessions retrieved', likes);
  } catch (error) {
    console.error('Error fetching user likes for sessions:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get event engagement statistics
 */
const getEventEngagement = async (req, res) => {
  try {
    const { eventId } = req.params;
    const stats = await service.getEventEngagementStats(eventId);
    return successResponse(res, 'Event engagement stats retrieved', stats);
  } catch (error) {
    console.error('Error fetching event engagement:', error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getSessionLikes,
  getSessionLikeCounts,
  toggleLike,
  addLike,
  removeLike,
  getUserLikes,
  getUserSessionLike,
  getTopLikedSessions,
  getSessionsReactions,
  getUserLikesForSessions,
  getEventEngagement
};
