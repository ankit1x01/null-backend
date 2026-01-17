/**
 * Event Mailer Tasks Controller
 * HTTP request handlers for mass email operations
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

/**
 * Get all mailer tasks
 */
const getMailerTasks = async (req, res) => {
  try {
    const filters = {
      event_id: req.query.event_id,
      status: req.query.status,
      executed: req.query.executed === 'true' ? true : req.query.executed === 'false' ? false : undefined
    };
    const tasks = await service.getAllMailerTasks(filters);
    return successResponse(res, 'Mailer tasks retrieved successfully', tasks);
  } catch (error) {
    console.error('Error fetching mailer tasks:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get mailer task by ID
 */
const getMailerTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await service.getMailerTaskById(id);
    if (!task) {
      return errorResponse(res, 'Mailer task not found', 404);
    }
    return successResponse(res, 'Mailer task retrieved successfully', task);
  } catch (error) {
    console.error('Error fetching mailer task:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Create a new mailer task
 */
const createMailerTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    const task = await service.createMailerTask(req.body, userId);
    return successResponse(res, 'Mailer task created successfully', task, 201);
  } catch (error) {
    console.error('Error creating mailer task:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Update mailer task
 */
const updateMailerTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await service.updateMailerTask(id, req.body);
    if (!task) {
      return errorResponse(res, 'Mailer task not found', 404);
    }
    return successResponse(res, 'Mailer task updated successfully', task);
  } catch (error) {
    console.error('Error updating mailer task:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Delete mailer task
 */
const deleteMailerTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteMailerTask(id);
    if (!deleted) {
      return errorResponse(res, 'Mailer task not found', 404);
    }
    return successResponse(res, 'Mailer task deleted successfully');
  } catch (error) {
    console.error('Error deleting mailer task:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Execute mailer task (send emails)
 */
const executeMailerTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await service.executeMailerTask(id);
    return successResponse(res, 'Mailer task executed successfully', task);
  } catch (error) {
    console.error('Error executing mailer task:', error);
    return errorResponse(res, error.message, 400);
  }
};

/**
 * Preview recipients
 */
const previewRecipients = async (req, res) => {
  try {
    const { event_id, registration_state, limit } = req.query;
    if (!event_id) {
      return errorResponse(res, 'event_id is required', 400);
    }
    const preview = await service.previewRecipients(event_id, registration_state, parseInt(limit) || 10);
    return successResponse(res, 'Recipients preview retrieved', preview);
  } catch (error) {
    console.error('Error previewing recipients:', error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getMailerTasks,
  getMailerTaskById,
  createMailerTask,
  updateMailerTask,
  deleteMailerTask,
  executeMailerTask,
  previewRecipients
};
