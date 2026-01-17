/**
 * Jobs Controller
 */
const service = require('./services');
const { JOB_STATES } = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

/**
 * Get all jobs
 */
const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 20, job_state, job_type } = req.query;
    const result = await service.getAllJobs(
      { job_state, job_type },
      parseInt(page),
      parseInt(limit)
    );
    return successResponse(res, 'Jobs retrieved successfully', result);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get job by ID
 */
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await service.getJobById(id);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }
    return successResponse(res, 'Job retrieved successfully', job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Create a job
 */
const createJob = async (req, res) => {
  try {
    const job = await service.createJob(req.body);
    return successResponse(res, 'Job created successfully', job, 201);
  } catch (error) {
    console.error('Error creating job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Queue a job
 */
const queueJob = async (req, res) => {
  try {
    const { job_type, payload, priority } = req.body;
    if (!job_type) {
      return errorResponse(res, 'job_type is required', 400);
    }
    const job = await service.queueJob(job_type, payload, priority);
    return successResponse(res, 'Job queued successfully', job, 201);
  } catch (error) {
    console.error('Error queueing job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Start a job
 */
const startJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await service.startJob(id);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }
    return successResponse(res, 'Job started', job);
  } catch (error) {
    console.error('Error starting job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Update job progress
 */
const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, output } = req.body;
    const job = await service.updateProgress(id, progress, output);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }
    return successResponse(res, 'Job progress updated', job);
  } catch (error) {
    console.error('Error updating job progress:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Complete a job
 */
const completeJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { output } = req.body;
    const job = await service.completeJob(id, output);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }
    return successResponse(res, 'Job completed', job);
  } catch (error) {
    console.error('Error completing job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Fail a job
 */
const failJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = req.body;
    const job = await service.failJob(id, error);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }
    return successResponse(res, 'Job marked as failed', job);
  } catch (error) {
    console.error('Error failing job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Pause a job
 */
const pauseJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await service.pauseJob(id);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }
    return successResponse(res, 'Job paused', job);
  } catch (error) {
    console.error('Error pausing job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Resume a job
 */
const resumeJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await service.resumeJob(id);
    if (!job) {
      return errorResponse(res, 'Job not found', 404);
    }
    return successResponse(res, 'Job resumed', job);
  } catch (error) {
    console.error('Error resuming job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Retry a failed job
 */
const retryJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await service.retryJob(id);
    if (!job) {
      return errorResponse(res, 'Job not found or not in error state', 404);
    }
    return successResponse(res, 'Job queued for retry', job);
  } catch (error) {
    console.error('Error retrying job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Delete a job
 */
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteJob(id);
    if (!deleted) {
      return errorResponse(res, 'Job not found', 404);
    }
    return successResponse(res, 'Job deleted successfully');
  } catch (error) {
    console.error('Error deleting job:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Clean old jobs
 */
const cleanOldJobs = async (req, res) => {
  try {
    const { daysOld = 30 } = req.query;
    const result = await service.cleanOldJobs(parseInt(daysOld));
    return successResponse(res, 'Old jobs cleaned', result);
  } catch (error) {
    console.error('Error cleaning jobs:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Get job statistics
 */
const getJobStats = async (req, res) => {
  try {
    const stats = await service.getJobStats();
    return successResponse(res, 'Job statistics retrieved', stats);
  } catch (error) {
    console.error('Error fetching job stats:', error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  queueJob,
  startJob,
  updateProgress,
  completeJob,
  failJob,
  pauseJob,
  resumeJob,
  retryJob,
  deleteJob,
  cleanOldJobs,
  getJobStats
};
