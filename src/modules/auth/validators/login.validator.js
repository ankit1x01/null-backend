/**
 * Login Validator
 * Validates login request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate login request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const validateLogin = (req) => {
  const { email, password } = req.body;
  
  if (sharedValidators.isRequired(email)) {
    throw new Error(JSON.stringify(constants.login.errorMessages.USRE0001));
  }

  if (!sharedValidators.isValidEmail(email)) {
    throw new Error(JSON.stringify(constants.login.errorMessages.USRE0008));
  }
  
  if (sharedValidators.isRequired(password)) {
    throw new Error(JSON.stringify(constants.login.errorMessages.USRE0002));
  }
  
  return { email, password };
}

module.exports = validateLogin;
