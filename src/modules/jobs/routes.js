/**
 * Jobs Routes
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { jwt } = require('../../shared/middlewares');

// All routes require authentication and admin privileges
router.use(jwt.verifyToken);
router.use(jwt.isAdmin);

// Get all jobs
router.get('/getJobs', controller.getJobs);

// Get job statistics
router.get('/stats', controller.getJobStats);

// Get job by ID
router.get('/getJobById/:id', controller.getJobById);

// Create/queue a job
router.post('/createJob', controller.createJob);
router.post('/queueJob', controller.queueJob);

// Job state transitions
router.post('/start/:id', controller.startJob);
router.post('/pause/:id', controller.pauseJob);
router.post('/resume/:id', controller.resumeJob);
router.post('/retry/:id', controller.retryJob);
router.post('/complete/:id', controller.completeJob);
router.post('/fail/:id', controller.failJob);

// Update progress
router.put('/progress/:id', controller.updateProgress);

// Cleanup
router.post('/cleanup', controller.cleanOldJobs);

// Delete job
router.delete('/deleteJob/:id', controller.deleteJob);

module.exports = router;
