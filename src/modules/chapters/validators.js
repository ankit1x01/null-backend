/**
 * Chapters Module Validators
 * Validates request data for chapters operations
 */

/**
 * Validate getChapters request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated data
 */
const getChapters = (req) => {
  const active_only = req.query.active_only === 'true' || req.query.active_only === '1';

  return {
    active_only
  };
};

/**
 * Validate getChapterById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated data
 * @throws {Error} - If validation fails
 */
const getChapterById = (req) => {
  const raw = req.query.chapterId || req.query.id || req.params.id;
  const chapterId = parseInt(raw);

  if (!chapterId || isNaN(chapterId)) {
    throw new Error(JSON.stringify({
      code: 'GETCE0003',
      statusCode: 400,
      message: 'Valid chapter ID is required'
    }));
  }

  return {
    chapterId,
    id: chapterId,
  };
};

module.exports = {
  getChapters,
  getChapterById
};
