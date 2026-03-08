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
  const where = {};
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
  const { session_topic, session_description, chapter_id, user_id } = params;

  if (!session_topic || !session_description) {
    throw new Error(JSON.stringify({
      code: 'SREQ_ERR002',
      statusCode: 400,
      message: 'session_topic and session_description are required'
    }));
  }

  const request = await models.SessionRequest.create({
    session_topic,
    session_description,
    chapter_id,
    user_id
  });

  return request;
};

/**
 * Update session request
 */
const updateSessionRequest = async (params) => {
  const { id, session_topic, session_description, chapter_id } = params;

  const request = await models.SessionRequest.findByPk(id);

  if (!request) {
    throw new Error(JSON.stringify({
      code: 'SREQ_ERR001',
      statusCode: 404,
      message: 'Session request not found'
    }));
  }

  await request.update({
    session_topic: session_topic || request.session_topic,
    session_description: session_description || request.session_description,
    chapter_id: chapter_id || request.chapter_id
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
