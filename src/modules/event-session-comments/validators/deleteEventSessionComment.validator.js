/**
 * DeleteEventSessionComment Validator
 * Validates deleteEventSessionComment request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate deleteEventSessionComment request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const deleteEventSessionComment = (req) => {
  const { /* TODO: Add expected fields */ } = req.body;
  
  // TODO: Add validation logic based on your requirements
  // Example validations:
  
  // if (sharedValidators.isRequired(requiredField)) {
  //   throw new Error(JSON.stringify(constants.deleteEventSessionComment.errorMessages.DELEE0001));
  // }
  
  // if (!sharedValidators.isValidEmail(email)) {
  //   throw new Error(JSON.stringify(constants.deleteEventSessionComment.errorMessages.DELEE0002));
  // }
  
  return req.body;
};

module.exports = deleteEventSessionComment;
