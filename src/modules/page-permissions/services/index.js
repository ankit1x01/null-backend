/**
 * PagePermissions Services
 * Export all page-permissions services
 */
const createPagePermission = require('./createPagePermission.service');
const updatePagePermission = require('./updatePagePermission.service');
const deletePagePermission = require('./deletePagePermission.service');

module.exports = {
  createPagePermission,
  updatePagePermission,
  deletePagePermission,
};
