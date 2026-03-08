/**
 * Vote Services (formerly Event Likes)
 * Business logic for session voting using the 'votes' table
 */
const db = require('../../shared/models');
const { Op } = require('sequelize');

class VoteService {
  /**
   * Get all likes (votes) for an event session
   */
  async getLikesBySession(sessionId) {
    return await db.Vote.findAll({
      where: {
        votable_id: sessionId,
        votable_type: 'EventSession',
        vote_flag: true
      },
      include: [
        { model: db.User, as: 'user', attributes: ['id', 'name', 'email', 'avatar'] }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get like counts for a session
   * Note: Original had multi-type (love, helpful, etc). We now only support 'like'.
   */
  async getSessionLikeCounts(sessionId) {
    const count = await db.Vote.count({
      where: {
        votable_id: sessionId,
        votable_type: 'EventSession',
        vote_flag: true
      }
    });

    return {
      like: count,
      love: 0,
      insightful: 0,
      helpful: 0,
      total: count
    };
  }

  /**
   * Get user's like for a session
   */
  async getUserLike(sessionId, userId) {
    return await db.Vote.findOne({
      where: {
        votable_id: sessionId,
        votable_type: 'EventSession',
        voter_id: userId,
        // voter_type: 'User', // Optional depending on data
        vote_flag: true
      }
    });
  }

  /**
   * Toggle like (add or remove)
   * We ignore 'likeType' param as we only support generic likes now.
   */
  async toggleLike(sessionId, userId, likeType = 'like') {
    const existingLike = await db.Vote.findOne({
      where: {
        votable_id: sessionId,
        votable_type: 'EventSession',
        voter_id: userId
      }
    });

    if (existingLike) {
      // If it exists, remove it (toggle off)
      await existingLike.destroy();
      return { action: 'removed', like: null };
    } else {
      // Create new like
      const like = await db.Vote.create({
        votable_id: sessionId,
        votable_type: 'EventSession',
        voter_id: userId,
        voter_type: 'User',
        vote_flag: true,
        vote_scope: null
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
      return existing;
    }

    return await db.Vote.create({
      votable_id: sessionId,
      votable_type: 'EventSession',
      voter_id: userId,
      voter_type: 'User',
      vote_flag: true
    });
  }

  /**
   * Remove like from a session
   */
  async removeLike(sessionId, userId) {
    const like = await db.Vote.findOne({
      where: {
        votable_id: sessionId,
        votable_type: 'EventSession',
        voter_id: userId
      }
    });

    if (!like) return false;
    await like.destroy();
    return true;
  }

  /**
   * Get all likes by a user
   * Requires careful joining since Vote is polymorphic
   */
  async getLikesByUser(userId) {
    // This is tricky with Sequelize polymorphic.
    // We'll fetch votes then manually fetch sessions or do a manual join if needed.
    // For now, let's try standard association if set up, or just basic fetch.
    const votes = await db.Vote.findAll({
      where: {
        voter_id: userId,
        votable_type: 'EventSession',
        vote_flag: true
      },
      order: [['created_at', 'DESC']]
    });

    // Populate event sessions manually if needed, or rely on client to fetch.
    // For MVP alignment:
    const sessionIds = votes.map(v => v.votable_id);
    const sessions = await db.EventSession.findAll({
      where: { id: { [Op.in]: sessionIds } },
      include: [{ model: db.Event, as: 'event', attributes: ['id', 'name'] }]
    });

    // Map sessions back to votes structure
    return votes.map(vote => {
      const session = sessions.find(s => s.id === vote.votable_id);
      const voteJSON = vote.toJSON();
      voteJSON.eventSession = session;
      return voteJSON;
    });
  }

  /**
   * Get top liked sessions for an event
   */
  async getTopLikedSessions(eventId, limit = 10) {
    // raw query might be safer for performance on large sets, but Sequelize is fine here
    const sessions = await db.EventSession.findAll({
      where: { event_id: eventId },
      include: [
        { model: db.User, as: 'user', attributes: ['id', 'name', 'avatar'] }
      ],
      // This literal needs to match the new table name 'votes'
      order: [[
        db.Sequelize.literal('(SELECT COUNT(*) FROM votes WHERE votes.votable_id = `EventSession`.id AND votes.votable_type = \'EventSession\' AND votes.vote_flag = 1)'),
        'DESC'
      ]],
      limit
    });

    // Manually attach counts
    return Promise.all(sessions.map(async session => {
      const count = await db.Vote.count({
        where: { votable_id: session.id, votable_type: 'EventSession', vote_flag: true }
      });
      return {
        ...session.toJSON(),
        likeCount: count
      };
    }));
  }

  /**
   * Get reactions summary for multiple sessions
   */
  async getSessionsReactions(sessionIds) {
    const votes = await db.Vote.findAll({
      where: {
        votable_id: { [Op.in]: sessionIds },
        votable_type: 'EventSession',
        vote_flag: true
      },
      attributes: [
        'votable_id',
        [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count']
      ],
      group: ['votable_id'],
      raw: true
    });

    // Initialize
    const result = {};
    sessionIds.forEach(id => {
      result[id] = { like: 0, love: 0, insightful: 0, helpful: 0, total: 0 };
    });

    votes.forEach(v => {
      const count = parseInt(v.count);
      result[v.votable_id].like = count;
      result[v.votable_id].total = count;
    });

    return result;
  }

  /**
   * Check if user has liked sessions
   */
  async getUserLikesForSessions(sessionIds, userId) {
    const votes = await db.Vote.findAll({
      where: {
        votable_id: { [Op.in]: sessionIds },
        votable_type: 'EventSession',
        voter_id: userId,
        vote_flag: true
      },
      raw: true
    });

    const result = {};
    votes.forEach(v => {
      result[v.votable_id] = 'like'; // Always 'like'
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

    const [totalLikes, uniqueUsers] = await Promise.all([
      db.Vote.count({
        where: { votable_id: { [Op.in]: sessionIds }, votable_type: 'EventSession', vote_flag: true }
      }),
      db.Vote.count({
        where: { votable_id: { [Op.in]: sessionIds }, votable_type: 'EventSession', vote_flag: true },
        distinct: true,
        col: 'voter_id'
      })
    ]);

    return {
      totalLikes,
      uniqueUsers,
      byType: { like: totalLikes }
    };
  }
}

module.exports = new VoteService();
