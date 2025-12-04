/**
 * GetChapters Service
 * Handles getChapters business logic
 */
const { Chapter } = require('../../../shared/models');

/**
 * GetChapters operation
 * @param {Object} data - GetChapters data
 * @param {string} data.requestId - Request ID for tracking
 * @param {boolean} data.active_only - Filter only active chapters
 * @returns {Promise<Array>} - List of chapters
 * @throws {Error} - If operation fails
 */
const getChapters = async ({ requestId, active_only = true }) => {
  console.log(`[${requestId}] GetChapters attempt - Active only: ${active_only}`);

  try {
    // Build query filter
    const where = {};
    if (active_only) {
      where.active = true;
    }

    // Fetch all chapters from database
    const chapters = await Chapter.findAll({
      where,
      attributes: [
        'id',
        'name',
        'description',
        'active',
        'country',
        'city',
        'state',
        'chapter_email',
        'twitter_handle',
        'facebook_profile',
        'github_profile',
        'linkedin_profile',
        'image',
        'created_at',
        'updated_at'
      ],
      order: [['name', 'ASC']]
    });

    console.log(`[${requestId}] GetChapters successful - Found ${chapters.length} chapters`);
    return chapters;
  } catch (error) {
    console.error(`[${requestId}] GetChapters failed:`, error.message);
    throw error;
  }
};

module.exports = getChapters;
