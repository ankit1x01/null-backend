/**
 * GetPages Constants
 * Contains message codes, texts, and status codes for getPages operations
 */

const getPagesConstants = {
  messages: {
    GETPS0001: {
      code: "GETPS0001",
      statusCode: 200,
      message: "GetPages successful",
    },
  },
  errorMessages: {
    GETPE0001: {
      code: "GETPE0001",
      statusCode: 400,
      message: "Required field is missing",
    },
    GETPE0002: {
      code: "GETPE0002",
      statusCode: 400,
      message: "Invalid input format",
    },
    GETPE0003: {
      code: "GETPE0003",
      statusCode: 404,
      message: "GetPages failed",
    },
  },
};

module.exports = getPagesConstants;
