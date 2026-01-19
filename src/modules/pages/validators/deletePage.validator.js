/**
 * DeletePage Validator
 * Validates deletePage request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate deletePage request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const deletePage = (req) => {
  // const { } = req.body;

  if (sharedValidators.isRequired(req.params.id)) {
    throw new Error(JSON.stringify(constants.deletePage.errorMessages.DELEE0001));
  }

  return {
    id: req.params.id
  };
};

module.exports = deletePage;
