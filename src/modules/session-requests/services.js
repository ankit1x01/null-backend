/**
 * Session Requests Services
 * Business logic for session requests operations
 */
const models = require('../../shared/models');
const { Op } = require('sequelize');

/**
 * Get all session requests
 */
const getSessionRequests = async (params) => {
  const { status } = params;
  
  const where = {};
  if (status) where.status = status;

  const requests = await models.SessionRequest.findAll({
    where,
    order: [['created_at', 'DESC']]
  });

  return requests;
};

/**
 * Get session request by ID
 */
const getSessionRequestById = async (params) => {
  const { id } = params;

  const request = await models.SessionRequest.findByPk(id);

  if (!request) {
    throw new Error(JSON.stringify({
      code: 'SREQ_ERR001',
      statusCode: 404,
      message: 'Session request not found'
    }));
  }

  return request;
};

/**
 * Create session request
 */
const createSessionRequest = async (params) => {
  const { title, description, requested_by, email } = params;

  if (!title || !description) {
    throw new Error(JSON.stringify({
      code: 'SREQ_ERR002',
      statusCode: 400,
      message: 'Title and description are required'
    }));
  }

  const request = await models.SessionRequest.create({
    title,
    description,
    requested_by: requested_by || 'Anonymous',
    email: email || null,
    status: 'open'
  });

  return request;
};

/**
 * Update session request
 */
const updateSessionRequest = async (params) => {
  const { id, title, description, requested_by, email } = params;

  const request = await models.SessionRequest.findByPk(id);

  if (!request) {
    throw new Error(JSON.stringify({
      code: 'SREQ_ERR001',
      statusCode: 404,
      message: 'Session request not found'
    }));
  }

  await request.update({
    title: title || request.title,
    description: description || request.description,
    requested_by: requested_by || request.requested_by,
    email: email !== undefined ? email : request.email
  });

  return request;
};

/**
 * Delete session request
 */
const deleteSessionRequest = async (params) => {
  const { id } = params;

  const request = await models.SessionRequest.findByPk(id);

  if (!request) {
    throw new Error(JSON.stringify({
      code: 'SREQ_ERR001',
      statusCode: 404,
      message: 'Session request not found'
    }));
  }

  await request.destroy();

  return { id, deleted: true };
};

/**
 * Update session request status (Admin only)
 */
const updateStatus = async (params) => {
  const { id, status } = params;

  const validStatuses = ['open', 'in_progress', 'completed', 'closed'];
  if (!validStatuses.includes(status)) {
    throw new Error(JSON.stringify({
      code: 'SREQ_ERR003',
      statusCode: 400,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    }));
  }

  const request = await models.SessionRequest.findByPk(id);

  if (!request) {
    throw new Error(JSON.stringify({
      code: 'SREQ_ERR001',
      statusCode: 404,
      message: 'Session request not found'
    }));
  }

  await request.update({ status });

  return request;
};

module.exports = {
  getSessionRequests,
  getSessionRequestById,
  createSessionRequest,
  updateSessionRequest,
  deleteSessionRequest,
  updateStatus
};
