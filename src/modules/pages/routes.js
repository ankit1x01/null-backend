/**
 * Pages Module Routes
 * Defines all routes for pages operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Pages routes
router.post('/createPage', controller.createPage);
router.get('/getPages', controller.getPages);
router.get('/getPageById', controller.getPageById);
router.put('/updatePage/:id', controller.updatePage);
router.delete('/deletePage/:id', controller.deletePage);

module.exports = router;
