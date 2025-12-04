/**
 * GetDashboardStats Service
 * Handles getDashboardStats business logic
 */
const { User, Chapter, Event, Page } = require('../../../shared/models');

/**
 * Get dashboard stats
 * @param {Object} data - Request data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const getDashboardStats = async ({ requestId }) => {
  console.log(`[${requestId}] GetDashboardStats attempt`);
  
  try {
    const [usersCount, chaptersCount, eventsCount, pagesCount] = await Promise.all([
      User.count(),
      Chapter.count({ where: { active: true } }),
      Event.count(),
      Page.count({ where: { published: true } })
    ]);

    // Get recent events
    const recentEvents = await Event.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      include: ['chapter']
    });

    // Get recent users
    const recentUsers = await User.findAll({
      limit: 5,
      order: [['created_at', 'DESC']]
    });
    
    console.log(`[${requestId}] GetDashboardStats successful`);
    return {
      counts: {
        users: usersCount,
        chapters: chaptersCount,
        events: eventsCount,
        pages: pagesCount
      },
      recentEvents,
      recentUsers
    };
  } catch (error) {
    console.error(`[${requestId}] GetDashboardStats failed:`, error.message);
    throw new Error(JSON.stringify({
      code: 'STATS0001',
      statusCode: 500,
      message: 'Failed to fetch dashboard stats'
    }));
  }
};

module.exports = getDashboardStats;
