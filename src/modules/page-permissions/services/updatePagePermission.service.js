/**
 * UpdatePagePermission Service
 * Handles updatePagePermission business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { PagePermission } = require('../../../shared/models');

/**
 * UpdatePagePermission operation
 * @param {Object} data - UpdatePagePermission data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.id - Permission ID
 * @param {string} data.permission_type - Permission type (ReadWrite or ReadOnly)
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const updatePagePermission = async ({ requestId, id, ...data }) => {
  console.log(`[${requestId}] UpdatePagePermission attempt for permission ${id}`);

  try {
    const permission = await PagePermission.findByPk(id);

    if (!permission) {
      throw new Error(JSON.stringify(constants.updatePagePermission.errorMessages.UPDAE0001));
    }

    await permission.update(data);

    console.log(`[${requestId}] UpdatePagePermission successful: Updated permission ${id}`);
    return permission;
  } catch (error) {
    console.error(`[${requestId}] UpdatePagePermission failed:`, error.message);

    // Re-throw if it's already a formatted error
    if (error.message.startsWith('{')) {
      throw error;
    }

    throw new Error(JSON.stringify(sharedConstants.serverError));
  }
};

module.exports = updatePagePermission;
