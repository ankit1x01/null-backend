/**
 * Chapters Module Constants
 * Defines constants, messages, and error codes for chapters operations
 */

module.exports = {
  getChapters: {
    messages: {
      GETCE0001: {
        code: 'GETCE0001',
        message: 'Chapters retrieved successfully'
      }
    },
    errorMessages: {
      GETCE0002: {
        code: 'GETCE0002',
        statusCode: 500,
        message: 'Failed to retrieve chapters'
      }
    }
  },
  getChapterById: {
    messages: {
      GETCE0001: {
        code: 'GETCE0001',
        message: 'Chapter retrieved successfully'
      }
    },
    errorMessages: {
      GETCE0003: {
        code: 'GETCE0003',
        statusCode: 404,
        message: 'Chapter not found'
      }
    }
  }
};
