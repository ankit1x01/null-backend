/**
 * Users Module Routes
 * Defines all routes for users operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All users routes require authentication
router.use(jwt.verifyToken);

// Users routes
router.get('/me', controller.getMe);
router.get('/events', controller.getUserEvents);
router.get('/sessions', controller.getUserSessions);
router.get('/getUsers', jwt.isAdmin, controller.getUsers);
router.get('/getUserById', controller.getUserById);
router.put('/updateUser/:id', controller.updateUser);
router.delete('/deleteUser/:id', controller.deleteUser);

module.exports = router;
