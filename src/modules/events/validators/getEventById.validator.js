/**
 * GetEventById Validator
 * Validates getEventById request data
 */
const constants = require('../constants');

/**
 * Validate getEventById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const getEventById = (req) => {
  // console.log('Validator: getEventById URL:', req.originalUrl, 'Query:', req.query, 'Body:', req.body, 'Params:', req.params);
  const id = req.query.id || req.body.id || req.params.id;

  if (!id) {
    throw new Error(JSON.stringify({
      code: 'VALD0001',
      statusCode: 400,
      message: `Valid event ID is required. Received: ${id}`
    }));
  }
  return {
    eventId: id
  };
};

module.exports = getEventById;
