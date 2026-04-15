/**
 * Session Proposals Module Routes
 * Defines all routes for session proposals operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// Public routes
router.get('/getSessionProposals', controller.getSessionProposals);
router.get('/getSessionProposalById/:id', controller.getSessionProposalById);

// Authenticated routes
router.post('/createSessionProposal', jwt.verifyToken, controller.createSessionProposal);
router.put('/updateSessionProposal/:id', jwt.verifyToken, controller.updateSessionProposal);
router.delete('/deleteSessionProposal/:id', jwt.verifyToken, jwt.isAdmin, controller.deleteSessionProposal);

module.exports = router;
