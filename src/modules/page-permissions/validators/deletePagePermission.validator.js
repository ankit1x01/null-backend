/**
 * DeletePagePermission Validator
 * Validates deletePagePermission request data
 */
const constants = require('../constants');

/**
 * Validate deletePagePermission request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const deletePagePermission = (req) => {
  const id = req.params.id;

  // Validate ID is provided
  if (!id) {
    throw new Error(JSON.stringify(constants.deletePagePermission.errorMessages.DELEE0001));
  }

  // Validate ID is a valid integer
  if (!Number.isInteger(Number(id))) {
    throw new Error(JSON.stringify(constants.deletePagePermission.errorMessages.DELEE0002));
  }

  return {
    id: Number(id)
  };
};

module.exports = deletePagePermission;
