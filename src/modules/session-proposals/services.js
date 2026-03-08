/**
 * Session Proposals Services
 * Business logic for session proposals operations
 */
const models = require('../../shared/models');

/**
 * Get all session proposals
 */
const getSessionProposals = async (params) => {
  const { chapter_id, user_id } = params;

  const where = {};
  if (chapter_id) where.chapter_id = chapter_id;
  if (user_id) where.user_id = user_id;

  const proposals = await models.SessionProposal.findAll({
    where,
    include: [
      {
        model: models.User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }
    ],
    order: [['created_at', 'DESC']]
  });

  return proposals;
};

/**
 * Get session proposal by ID
 */
const getSessionProposalById = async (params) => {
  const { id } = params;

  const proposal = await models.SessionProposal.findByPk(id, {
    include: [
      {
        model: models.User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }
    ]
  });

  if (!proposal) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR001',
      statusCode: 404,
      message: 'Session proposal not found'
    }));
  }

  return proposal;
};

/**
 * Create session proposal
 */
const createSessionProposal = async (params) => {
  const { session_topic, session_description, chapter_id, event_type_id, user_id } = params;

  if (!session_topic) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR002',
      statusCode: 400,
      message: 'session_topic is required'
    }));
  }

  const proposal = await models.SessionProposal.create({
    session_topic,
    session_description,
    chapter_id,
    event_type_id,
    user_id
  });

  return await getSessionProposalById({ id: proposal.id });
};



/**
 * Update session proposal
 */
const updateSessionProposal = async (params) => {
  const { id, title, description, session_type, user_id } = params;

  const proposal = await models.SessionProposal.findByPk(id);

  if (!proposal) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR001',
      statusCode: 404,
      message: 'Session proposal not found'
    }));
  }

  // Check if user owns this proposal (unless admin)
  if (proposal.user_id !== user_id) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR003',
      statusCode: 403,
      message: 'You can only edit your own proposals'
    }));
  }

  // Only allow editing if status is pending
  if (proposal.status !== 'pending') {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR004',
      statusCode: 400,
      message: 'Cannot edit proposal after it has been reviewed'
    }));
  }

  await proposal.update({
    title: title || proposal.title,
    description: description || proposal.description,
    session_type: session_type || proposal.session_type
  });

  return await getSessionProposalById({ id });
};

/**
 * Delete session proposal
 */
const deleteSessionProposal = async (params) => {
  const { id } = params;

  const proposal = await models.SessionProposal.findByPk(id);

  if (!proposal) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR001',
      statusCode: 404,
      message: 'Session proposal not found'
    }));
  }

  await proposal.destroy();

  return { id, deleted: true };
};

/**
 * Update session proposal status (Admin only)
 */
const updateStatus = async (params) => {
  const { id, status } = params;

  const validStatuses = ['pending', 'approved', 'rejected'];
  if (!validStatuses.includes(status)) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR005',
      statusCode: 400,
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    }));
  }

  const proposal = await models.SessionProposal.findByPk(id);

  if (!proposal) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR001',
      statusCode: 404,
      message: 'Session proposal not found'
    }));
  }

  await proposal.update({ status });

  return await getSessionProposalById({ id });
};

module.exports = {
  getSessionProposals,
  getSessionProposalById,
  createSessionProposal,
  updateSessionProposal,
  deleteSessionProposal,
  updateStatus
};
