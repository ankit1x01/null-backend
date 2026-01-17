/**
 * Event Likes Services
 * Business logic for session voting/reactions
 */
const db = require('../../shared/models');
const { Op } = require('sequelize');

class EventLikeService {
  /**
   * Get all likes for an event session
   */
  async getLikesBySession(sessionId) {
    return await db.EventLike.findAll({
      where: { event_session_id: sessionId },
      include: [
        { model: db.User, as: 'user', attributes: ['id', 'name', 'email', 'avatar_url'] }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get like counts by type for a session
   */
  async getSessionLikeCounts(sessionId) {
    const counts = await db.EventLike.findAll({
      where: { event_session_id: sessionId },
      attributes: [
        'like_type',
        [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count']
      ],
      group: ['like_type'],
      raw: true
    });

    const result = {
      like: 0,
      love: 0,
      insightful: 0,
      helpful: 0,
      total: 0
    };

    counts.forEach(c => {
      result[c.like_type] = parseInt(c.count);
      result.total += parseInt(c.count);
    });

    return result;
  }

  /**
   * Get user's like for a session
   */
  async getUserLike(sessionId, userId) {
    return await db.EventLike.findOne({
      where: {
        event_session_id: sessionId,
        user_id: userId
      }
    });
  }

  /**
   * Toggle like (add or remove)
   */
  async toggleLike(sessionId, userId, likeType = 'like') {
    const existingLike = await db.EventLike.findOne({
      where: {
        event_session_id: sessionId,
        user_id: userId
      }
    });

    if (existingLike) {
      if (existingLike.like_type === likeType) {
        // Same type - remove the like
        await existingLike.destroy();
        return { action: 'removed', like: null };
      } else {
        // Different type - update the like
        await existingLike.update({ like_type: likeType });
        return { action: 'updated', like: existingLike };
      }
    } else {
      // Create new like
      const like = await db.EventLike.create({
        event_session_id: sessionId,
        user_id: userId,
        like_type: likeType
      });
      return { action: 'created', like };
    }
  }

  /**
   * Add like to a session
   */
  async addLike(sessionId, userId, likeType = 'like') {
    // Check if already liked
    const existing = await this.getUserLike(sessionId, userId);
    if (existing) {
      // Update the like type
      await existing.update({ like_type: likeType });
      return existing;
    }

    return await db.EventLike.create({
      event_session_id: sessionId,
      user_id: userId,
      like_type: likeType
    });
  }

  /**
   * Remove like from a session
   */
  async removeLike(sessionId, userId) {
    const like = await db.EventLike.findOne({
      where: {
        event_session_id: sessionId,
        user_id: userId
      }
    });

    if (!like) return false;
    await like.destroy();
    return true;
  }

  /**
   * Get all likes by a user
   */
  async getLikesByUser(userId) {
    return await db.EventLike.findAll({
      where: { user_id: userId },
      include: [
        { 
          model: db.EventSession, 
          as: 'eventSession',
          include: [
            { model: db.Event, as: 'event', attributes: ['id', 'name'] }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get top liked sessions for an event
   */
  async getTopLikedSessions(eventId, limit = 10) {
    const sessions = await db.EventSession.findAll({
      where: { event_id: eventId },
      include: [
        { model: db.User, as: 'user', attributes: ['id', 'name', 'avatar_url'] },
        { model: db.EventLike, as: 'eventLikes' }
      ],
      order: [[db.Sequelize.literal('(SELECT COUNT(*) FROM event_likes WHERE event_likes.event_session_id = "EventSession".id)'), 'DESC']],
      limit
    });

    return sessions.map(session => ({
      ...session.toJSON(),
      likeCount: session.eventLikes?.length || 0
    }));
  }

  /**
   * Get reactions summary for multiple sessions
   */
  async getSessionsReactions(sessionIds) {
    const likes = await db.EventLike.findAll({
      where: {
        event_session_id: { [Op.in]: sessionIds }
      },
      attributes: [
        'event_session_id',
        'like_type',
        [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count']
      ],
      group: ['event_session_id', 'like_type'],
      raw: true
    });

    // Group by session
    const result = {};
    sessionIds.forEach(id => {
      result[id] = { like: 0, love: 0, insightful: 0, helpful: 0, total: 0 };
    });

    likes.forEach(l => {
      result[l.event_session_id][l.like_type] = parseInt(l.count);
      result[l.event_session_id].total += parseInt(l.count);
    });

    return result;
  }

  /**
   * Check if user has liked sessions
   */
  async getUserLikesForSessions(sessionIds, userId) {
    const likes = await db.EventLike.findAll({
      where: {
        event_session_id: { [Op.in]: sessionIds },
        user_id: userId
      },
      raw: true
    });

    const result = {};
    likes.forEach(l => {
      result[l.event_session_id] = l.like_type;
    });

    return result;
  }

  /**
   * Get event engagement statistics
   */
  async getEventEngagementStats(eventId) {
    const sessions = await db.EventSession.findAll({
      where: { event_id: eventId },
      attributes: ['id']
    });

    const sessionIds = sessions.map(s => s.id);

    if (sessionIds.length === 0) {
      return { totalLikes: 0, uniqueUsers: 0, byType: {} };
    }

    const [totalLikes, uniqueUsers, byType] = await Promise.all([
      db.EventLike.count({
        where: { event_session_id: { [Op.in]: sessionIds } }
      }),
      db.EventLike.count({
        where: { event_session_id: { [Op.in]: sessionIds } },
        distinct: true,
        col: 'user_id'
      }),
      db.EventLike.findAll({
        where: { event_session_id: { [Op.in]: sessionIds } },
        attributes: [
          'like_type',
          [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count']
        ],
        group: ['like_type'],
        raw: true
      })
    ]);

    const typeStats = {};
    byType.forEach(t => {
      typeStats[t.like_type] = parseInt(t.count);
    });

    return {
      totalLikes,
      uniqueUsers,
      byType: typeStats
    };
  }
}

module.exports = new EventLikeService();
