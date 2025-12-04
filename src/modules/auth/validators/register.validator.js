/**
 * Register Validator
 * Validates user registration request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate register request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const validateRegister = (req) => {
  const { email, password, name } = req.body;
  
  if (sharedValidators.isRequired(email)) {
    throw new Error(JSON.stringify(constants.register.errorMessages.USRE0004));
  }

  if (!sharedValidators.isValidEmail(email)) {
    throw new Error(JSON.stringify(constants.register.errorMessages.USRE0008));
  }
  
  if (sharedValidators.isRequired(password)) {
    throw new Error(JSON.stringify(constants.register.errorMessages.USRE0005));
  }
  
  if (sharedValidators.isRequired(name)) {
    throw new Error(JSON.stringify(constants.register.errorMessages.USRE0006));
  }
  
  return { email, password, name };
}

module.exports = validateRegister;
