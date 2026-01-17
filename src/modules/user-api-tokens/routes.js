/**
 * User API Tokens Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All routes require authentication
router.use(jwt.verifyToken);

router.get('/', controller.getMyTokens);
router.post('/', controller.createToken);
router.put('/:id', controller.updateToken);
router.post('/:id/regenerate', controller.regenerateToken);
router.delete('/:id', controller.revokeToken);

module.exports = router;
