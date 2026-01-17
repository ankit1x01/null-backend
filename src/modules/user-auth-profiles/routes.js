/**
 * User Auth Profiles Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All routes require authentication
router.use(jwt.verifyToken);

router.get('/me', controller.getMyProfiles);
router.post('/link', controller.linkProvider);
router.delete('/unlink/:provider', controller.unlinkProvider);

module.exports = router;
