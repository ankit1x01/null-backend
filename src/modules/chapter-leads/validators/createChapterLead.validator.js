/**
 * CreateChapterLead Validator
 * Validates createChapterLead request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate createChapterLead request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const createChapterLead = (req) => {
  const { chapter_id, user_id, active } = req.body;

  // Validate required fields
  if (!chapter_id) {
    throw new Error(JSON.stringify(constants.createChapterLead.errorMessages.CREAE0001));
  }

  if (!user_id) {
    throw new Error(JSON.stringify(constants.createChapterLead.errorMessages.CREAE0001));
  }

  // Validate field types
  if (!Number.isInteger(Number(chapter_id))) {
    throw new Error(JSON.stringify(constants.createChapterLead.errorMessages.CREAE0002));
  }

  if (!Number.isInteger(Number(user_id))) {
    throw new Error(JSON.stringify(constants.createChapterLead.errorMessages.CREAE0002));
  }

  // Validate active field if provided
  if (active !== undefined && typeof active !== 'boolean') {
    throw new Error(JSON.stringify(constants.createChapterLead.errorMessages.CREAE0002));
  }

  return req.body;
};

module.exports = createChapterLead;
