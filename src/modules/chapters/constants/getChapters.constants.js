/**
 * GetChapters Constants
 * Contains message codes, texts, and status codes for getChapters operations
 */

const getChaptersConstants = {
  messages: {
    GETCS0001: {
      code: "GETCS0001",
      statusCode: 200,
      message: "GetChapters successful",
    },
  },
  errorMessages: {
    GETCE0001: {
      code: "GETCE0001",
      statusCode: 400,
      message: "Required field is missing",
    },
    GETCE0002: {
      code: "GETCE0002",
      statusCode: 400,
      message: "Invalid input format",
    },
    GETCE0003: {
      code: "GETCE0003",
      statusCode: 404,
      message: "GetChapters failed",
    },
  },
};

module.exports = getChaptersConstants;
