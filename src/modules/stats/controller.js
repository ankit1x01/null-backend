/**
 * Stats Controller
 * Handles HTTP requests for stats operations
 */
const statsServices = require('./services');

const controller = {
  getDashboardStats: async (req, res, next) => {
    try {
      req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
      const result = await statsServices.getDashboardStats({
        requestId: req.requestId
      });
      next({
        code: 'STATS0001',
        statusCode: 200,
        message: 'Stats retrieved successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = controller;
