/**
 * DeletePagePermission Service
 * Handles deletePagePermission business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { PagePermission } = require('../../../shared/models');

/**
 * DeletePagePermission operation
 * @param {Object} data - DeletePagePermission data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.id - Permission ID
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const deletePagePermission = async ({ requestId, id }) => {
  console.log(`[${requestId}] DeletePagePermission attempt for permission ${id}`);

  try {
    const permission = await PagePermission.findByPk(id);

    if (!permission) {
      throw new Error(JSON.stringify(constants.deletePagePermission.errorMessages.DELEE0001));
    }

    await permission.destroy();

    console.log(`[${requestId}] DeletePagePermission successful: Deleted permission ${id}`);
    return { id, deleted: true };
  } catch (error) {
    console.error(`[${requestId}] DeletePagePermission failed:`, error.message);

    // Re-throw if it's already a formatted error
    if (error.message.startsWith('{')) {
      throw error;
    }

    throw new Error(JSON.stringify(sharedConstants.serverError));
  }
};

module.exports = deletePagePermission;
