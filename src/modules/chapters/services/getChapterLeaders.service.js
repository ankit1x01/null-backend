/**
 * GetChapterLeaders Service
 * Returns leaders of a chapter
 * Matches Rails: GET /chapters/:id/leaders
 */
const { ChapterLead, User, Chapter } = require('../../../shared/models');

/**
 * Get leaders of a chapter
 * @param {Object} data - Request data
 * @param {number} data.chapterId - Chapter ID
 * @returns {Promise<Array>} - List of chapter leaders
 */
const getChapterLeaders = async ({ chapterId }) => {
  // Verify chapter exists
  const chapter = await Chapter.findByPk(chapterId);
  if (!chapter) {
    throw new Error(JSON.stringify({
      code: 'CHPT0404',
      statusCode: 404,
      message: 'Chapter not found'
    }));
  }

  const leads = await ChapterLead.findAll({
    where: { chapter_id: chapterId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'avatar', 'handle', 'twitter_handle', 'github_profile', 'linkedin_profile']
      }
    ],
    order: [['created_at', 'ASC']]
  });

  return leads.map(lead => ({
    id: lead.id,
    user_id: lead.user_id,
    chapter_id: lead.chapter_id,
    created_at: lead.created_at,
    user: lead.user ? {
      id: lead.user.id,
      name: lead.user.name,
      email: lead.user.email,
      avatar: lead.user.avatar,
      handle: lead.user.handle,
      twitter_handle: lead.user.twitter_handle,
      github_profile: lead.user.github_profile,
      linkedin_profile: lead.user.linkedin_profile
    } : null
  }));
};

module.exports = getChapterLeaders;
