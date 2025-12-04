/**
 * GetUserSessions Constants
 * Contains message codes, texts, and status codes for getUserSessions operations
 */

const getUserSessionsConstants = {
  messages: {
    GETUS0001: {
      code: "GETUS0001",
      statusCode: 200,
      message: "GetUserSessions successful",
    },
  },
  errorMessages: {
    GETUE0001: {
      code: "GETUE0001",
      statusCode: 400,
      message: "Required field is missing",
    },
    GETUE0002: {
      code: "GETUE0002",
      statusCode: 400,
      message: "Invalid input format",
    },
    GETUE0003: {
      code: "GETUE0003",
      statusCode: 404,
      message: "GetUserSessions failed",
    },
  },
};

module.exports = getUserSessionsConstants;
