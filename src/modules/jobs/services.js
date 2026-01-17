/**
 * Jobs Services
 * Business logic for background job management
 */
const db = require('../../shared/models');
const { Op } = require('sequelize');

// Job states
const JOB_STATES = {
  NEW: 100,
  RUNNING: 200,
  PAUSED: 300,
  FINISHED: 400,
  ERROR: 500
};

class JobService {
  /**
   * Get all jobs with pagination
   */
  async getAllJobs(filters = {}, page = 1, limit = 20) {
    const where = {};
    if (filters.job_state) where.job_state = filters.job_state;
    if (filters.job_type) where.job_type = filters.job_type;

    const offset = (page - 1) * limit;
    const { count, rows } = await db.Job.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit,
      offset
    });

    return {
      jobs: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  /**
   * Get job by ID
   */
  async getJobById(id) {
    return await db.Job.findByPk(id);
  }

  /**
   * Create a new job
   */
  async createJob(data) {
    return await db.Job.create({
      ...data,
      job_state: JOB_STATES.NEW,
      progress: 0
    });
  }

  /**
   * Queue a job for processing
   */
  async queueJob(jobType, payload = {}, priority = 0) {
    return await db.Job.create({
      job_type: jobType,
      job_data: payload,
      job_state: JOB_STATES.NEW,
      priority,
      progress: 0,
      scheduled_at: new Date()
    });
  }

  /**
   * Get next pending job
   */
  async getNextPendingJob() {
    return await db.Job.findOne({
      where: {
        job_state: JOB_STATES.NEW,
        scheduled_at: { [Op.lte]: new Date() }
      },
      order: [
        ['priority', 'DESC'],
        ['created_at', 'ASC']
      ]
    });
  }

  /**
   * Start processing a job
   */
  async startJob(id) {
    const job = await db.Job.findByPk(id);
    if (!job) return null;
    
    await job.update({
      job_state: JOB_STATES.RUNNING,
      started_at: new Date()
    });
    
    return job;
  }

  /**
   * Update job progress
   */
  async updateProgress(id, progress, output = null) {
    const job = await db.Job.findByPk(id);
    if (!job) return null;
    
    const updates = { progress };
    if (output) {
      updates.job_output = output;
    }
    
    await job.update(updates);
    return job;
  }

  /**
   * Complete a job
   */
  async completeJob(id, output = null) {
    const job = await db.Job.findByPk(id);
    if (!job) return null;
    
    await job.update({
      job_state: JOB_STATES.FINISHED,
      progress: 100,
      completed_at: new Date(),
      job_output: output
    });
    
    return job;
  }

  /**
   * Fail a job
   */
  async failJob(id, error) {
    const job = await db.Job.findByPk(id);
    if (!job) return null;
    
    await job.update({
      job_state: JOB_STATES.ERROR,
      error_message: error,
      completed_at: new Date(),
      retry_count: (job.retry_count || 0) + 1
    });
    
    return job;
  }

  /**
   * Pause a job
   */
  async pauseJob(id) {
    const job = await db.Job.findByPk(id);
    if (!job) return null;
    
    await job.update({
      job_state: JOB_STATES.PAUSED
    });
    
    return job;
  }

  /**
   * Resume a job
   */
  async resumeJob(id) {
    const job = await db.Job.findByPk(id);
    if (!job) return null;
    
    await job.update({
      job_state: JOB_STATES.NEW
    });
    
    return job;
  }

  /**
   * Retry failed job
   */
  async retryJob(id) {
    const job = await db.Job.findByPk(id);
    if (!job || job.job_state !== JOB_STATES.ERROR) return null;
    
    await job.update({
      job_state: JOB_STATES.NEW,
      error_message: null,
      scheduled_at: new Date()
    });
    
    return job;
  }

  /**
   * Delete a job
   */
  async deleteJob(id) {
    const job = await db.Job.findByPk(id);
    if (!job) return false;
    await job.destroy();
    return true;
  }

  /**
   * Clean old completed jobs
   */
  async cleanOldJobs(daysOld = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await db.Job.destroy({
      where: {
        job_state: { [Op.in]: [JOB_STATES.FINISHED, JOB_STATES.ERROR] },
        completed_at: { [Op.lt]: cutoffDate }
      }
    });

    return { deleted: result };
  }

  /**
   * Get job statistics
   */
  async getJobStats() {
    const stats = await db.Job.findAll({
      attributes: [
        'job_state',
        [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count']
      ],
      group: ['job_state'],
      raw: true
    });

    const stateNames = {
      100: 'pending',
      200: 'running',
      300: 'paused',
      400: 'completed',
      500: 'failed'
    };

    const result = {};
    stats.forEach(s => {
      result[stateNames[s.job_state] || 'unknown'] = parseInt(s.count);
    });

    return result;
  }

  /**
   * Process jobs worker (main processing loop)
   */
  async processJobs(handler) {
    const job = await this.getNextPendingJob();
    if (!job) return null;

    await this.startJob(job.id);

    try {
      const result = await handler(job);
      await this.completeJob(job.id, result);
      return { success: true, job };
    } catch (error) {
      await this.failJob(job.id, error.message);
      return { success: false, job, error: error.message };
    }
  }
}

module.exports = new JobService();
module.exports.JOB_STATES = JOB_STATES;
