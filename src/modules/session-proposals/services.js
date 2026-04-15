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
    user_id,
  });

  return await getSessionProposalById({ id: proposal.id });
};



/**
 * Update session proposal
 */
const updateSessionProposal = async (params) => {
  const { id, session_topic, session_description, user_id } = params;

  const proposal = await models.SessionProposal.findByPk(id);

  if (!proposal) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR001',
      statusCode: 404,
      message: 'Session proposal not found'
    }));
  }

  // Check if user owns this proposal
  if (proposal.user_id !== user_id) {
    throw new Error(JSON.stringify({
      code: 'SPROP_ERR003',
      statusCode: 403,
      message: 'You can only edit your own proposals'
    }));
  }

  await proposal.update({
    session_topic: session_topic || proposal.session_topic,
    session_description: session_description || proposal.session_description,
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

module.exports = {
  getSessionProposals,
  getSessionProposalById,
  createSessionProposal,
  updateSessionProposal,
  deleteSessionProposal,
};
