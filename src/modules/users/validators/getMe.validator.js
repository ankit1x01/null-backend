/**
 * GetMe Validator
 * Validates getMe request data
 */

/**
 * Validate getMe request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getMe = (req) => {
  // No validation needed - getMe uses JWT token from req.user
  // which is already validated by JWT middleware
  return {
    user_id: req.user?.id
  };
};

module.exports = getMe;
