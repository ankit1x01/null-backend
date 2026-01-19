/**
 * CreatePagePermission Validator
 * Validates createPagePermission request data
 */
const constants = require('../constants');

/**
 * Validate createPagePermission request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const createPagePermission = (req) => {
  const { page_id, user_id, permission_type } = req.body;

  // Validate required fields
  if (!page_id) {
    throw new Error(JSON.stringify(constants.createPagePermission.errorMessages.CREAE0001));
  }

  if (!user_id) {
    throw new Error(JSON.stringify(constants.createPagePermission.errorMessages.CREAE0001));
  }

  if (!permission_type) {
    throw new Error(JSON.stringify(constants.createPagePermission.errorMessages.CREAE0001));
  }

  // Validate field types
  if (!Number.isInteger(Number(page_id))) {
    throw new Error(JSON.stringify(constants.createPagePermission.errorMessages.CREAE0002));
  }

  if (!Number.isInteger(Number(user_id))) {
    throw new Error(JSON.stringify(constants.createPagePermission.errorMessages.CREAE0002));
  }

  // Validate permission_type enum
  const validTypes = ['ReadWrite', 'ReadOnly'];
  if (!validTypes.includes(permission_type)) {
    throw new Error(JSON.stringify(constants.createPagePermission.errorMessages.CREAE0002));
  }

  return req.body;
};

module.exports = createPagePermission;
