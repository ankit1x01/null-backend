/**
 * Events Module Validators
 * Validates request data for events operations
 */

/**
 * Validate getEvents request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated data
 * @throws {Error} - If validation fails
 */
const getEvents = (req) => {
  const page = parseInt(req.query.page) || 0;
  const per_page = parseInt(req.query.per_page) || 10;
  const all = req.query.all === 'true' || req.query.all === '1';

  if (page < 0) {
    throw new Error(JSON.stringify({
      code: 'GETES0002',
      statusCode: 400,
      message: 'Page number must be non-negative'
    }));
  }

  if (per_page < 1 || per_page > 100) {
    throw new Error(JSON.stringify({
      code: 'GETES0002',
      statusCode: 400,
      message: 'Per page must be between 1 and 100'
    }));
  }

  return {
    page,
    per_page,
    all
  };
};

/**
 * Validate getEventById request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated data
 * @throws {Error} - If validation fails
 */
const getEventById = (req) => {
  const eventId = parseInt(req.query.eventId);

  if (!eventId || isNaN(eventId)) {
    throw new Error(JSON.stringify({
      code: 'GETES0003',
      statusCode: 400,
      message: 'Valid event ID is required'
    }));
  }

  return {
    eventId
  };
};

module.exports = {
  getEvents,
  getEventById
};
