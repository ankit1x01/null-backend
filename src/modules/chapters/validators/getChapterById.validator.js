/**
 * GetChapterById Validator
 * Validates getChapterById request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate getChapterById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getChapterById = (req) => {
  const { id, chapterId } = { ...req.query, ...req.body };
  const finalId = id || chapterId;

  if (!finalId) {
    throw new Error(JSON.stringify(constants.getChapterById.errorMessages.GETCE0001)); // Or create a missing param error
  }

  if (isNaN(Number(finalId))) {
    throw new Error(JSON.stringify(constants.getChapterById.errorMessages.GETCE0002)); // Invalid format
  }

  return { id: Number(finalId) };
};

module.exports = getChapterById;
