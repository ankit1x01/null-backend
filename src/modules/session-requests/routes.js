/**
 * Session Requests Module Routes
 * Defines all routes for session requests operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// Public routes
router.get('/getSessionRequests', controller.getSessionRequests);
router.get('/getSessionRequestById/:id', controller.getSessionRequestById);

// Anyone can create a session request (no auth required)
router.post('/createSessionRequest', controller.createSessionRequest);

// Admin routes
router.put('/updateSessionRequest/:id', jwt.verifyToken, jwt.isAdmin, controller.updateSessionRequest);
router.put('/updateStatus/:id', jwt.verifyToken, jwt.isAdmin, controller.updateStatus);
router.delete('/deleteSessionRequest/:id', jwt.verifyToken, jwt.isAdmin, controller.deleteSessionRequest);

module.exports = router;
