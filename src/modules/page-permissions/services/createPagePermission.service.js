/**
 * CreatePagePermission Service
 * Handles createPagePermission business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');
const { PagePermission } = require('../../../shared/models');

/**
 * CreatePagePermission operation
 * @param {Object} data - CreatePagePermission data
 * @param {string} data.requestId - Request ID for tracking
 * @param {number} data.page_id - Page ID
 * @param {number} data.user_id - User ID
 * @param {string} data.permission_type - Permission type (ReadWrite or ReadOnly)
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const createPagePermission = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] CreatePagePermission attempt`);

  try {
    const permission = await PagePermission.create(data);

    console.log(`[${requestId}] CreatePagePermission successful: Created permission ${permission.id}`);
    return permission;
  } catch (error) {
    console.error(`[${requestId}] CreatePagePermission failed:`, error.message);
    throw new Error(JSON.stringify(sharedConstants.serverError));
  }
};

module.exports = createPagePermission;
