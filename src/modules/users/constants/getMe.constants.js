/**
 * GetMe Constants
 * Contains message codes, texts, and status codes for getMe operations
 */

const getMeConstants = {
  messages: {
    GETMS0001: {
      code: "GETMS0001",
      statusCode: 200,
      message: "GetMe successful",
    },
  },
  errorMessages: {
    GETME0001: {
      code: "GETME0001",
      statusCode: 400,
      message: "Required field is missing",
    },
    GETME0002: {
      code: "GETME0002",
      statusCode: 400,
      message: "Invalid input format",
    },
    GETME0003: {
      code: "GETME0003",
      statusCode: 404,
      message: "GetMe failed",
    },
  },
};

module.exports = getMeConstants;
