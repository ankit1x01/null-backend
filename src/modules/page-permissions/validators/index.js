/**
 * PagePermissions Validators
 * Export all page-permissions validators
 */
const createPagePermission = require('./createPagePermission.validator');
const updatePagePermission = require('./updatePagePermission.validator');
const deletePagePermission = require('./deletePagePermission.validator');

module.exports = {
  createPagePermission,
  updatePagePermission,
  deletePagePermission,
};
