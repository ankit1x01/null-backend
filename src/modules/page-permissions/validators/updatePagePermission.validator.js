/**
 * UpdatePagePermission Validator
 * Validates updatePagePermission request data
 */
const constants = require('../constants');

/**
 * Validate updatePagePermission request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const updatePagePermission = (req) => {
  const { permission_type } = req.body;

  // Permission type must be provided for update
  if (!permission_type) {
    throw new Error(JSON.stringify(constants.updatePagePermission.errorMessages.UPDAE0001));
  }

  // Validate permission_type enum
  const validTypes = ['ReadWrite', 'ReadOnly'];
  if (!validTypes.includes(permission_type)) {
    throw new Error(JSON.stringify(constants.updatePagePermission.errorMessages.UPDAE0002));
  }

  return req.body;
};

module.exports = updatePagePermission;
