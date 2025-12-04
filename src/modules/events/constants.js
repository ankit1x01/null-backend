/**
 * Events Module Constants
 * Defines constants, messages, and error codes for events operations
 */

module.exports = {
  getEvents: {
    messages: {
      GETES0001: {
        code: 'GETES0001',
        message: 'Events retrieved successfully'
      }
    },
    errorMessages: {
      GETES0002: {
        code: 'GETES0002',
        statusCode: 400,
        message: 'Invalid pagination parameters'
      }
    }
  },
  getEventById: {
    messages: {
      GETES0001: {
        code: 'GETES0001',
        message: 'Event retrieved successfully'
      }
    },
    errorMessages: {
      GETES0003: {
        code: 'GETES0003',
        statusCode: 404,
        message: 'Event not found'
      }
    }
  }
};
