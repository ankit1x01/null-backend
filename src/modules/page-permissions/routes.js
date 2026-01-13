/**
 * PagePermissions Module Routes
 * Defines all routes for page-permissions operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const { jwt } = require('../../shared/middlewares');

// PagePermissions routes
router.post('/createPagePermission', jwt.verifyToken, jwt.isAdmin, controller.createPagePermission);
router.put('/updatePagePermission/:id', jwt.verifyToken, jwt.isAdmin, controller.updatePagePermission);
router.delete('/deletePagePermission/:id', jwt.verifyToken, jwt.isAdmin, controller.deletePagePermission);

module.exports = router;
