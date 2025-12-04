/**
 * PagePermissions Module Routes
 * Defines all routes for page-permissions operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// PagePermissions routes
router.post('/createPagePermission', controller.createPagePermission);
router.put('/updatePagePermission/:id', controller.updatePagePermission);
router.delete('/deletePagePermission/:id', controller.deletePagePermission);

module.exports = router;
