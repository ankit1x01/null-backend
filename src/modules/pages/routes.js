/**
 * Pages Module Routes
 * Defines all routes for pages operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const { jwt } = require('../../shared/middlewares');

// Pages routes
router.post('/createPage', jwt.verifyToken, jwt.isAdmin, controller.createPage);
router.get('/getPages', controller.getPages);
router.get('/getPageById', controller.getPageById);
router.put('/updatePage/:id', jwt.verifyToken, jwt.isAdmin, controller.updatePage);
router.delete('/deletePage/:id', jwt.verifyToken, jwt.isAdmin, controller.deletePage);

module.exports = router;
