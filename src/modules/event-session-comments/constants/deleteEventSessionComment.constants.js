/**
 * DeleteEventSessionComment Constants
 * Contains message codes, texts, and status codes for deleteEventSessionComment operations
 */

const deleteEventSessionCommentConstants = {
  messages: {
    DELES0001: {
      code: "DELES0001",
      statusCode: 200,
      message: "DeleteEventSessionComment successful",
    },
  },
  errorMessages: {
    DELEE0001: {
      code: "DELEE0001",
      statusCode: 400,
      message: "Required field is missing",
    },
    DELEE0002: {
      code: "DELEE0002",
      statusCode: 400,
      message: "Invalid input format",
    },
    DELEE0003: {
      code: "DELEE0003",
      statusCode: 404,
      message: "DeleteEventSessionComment failed",
    },
  },
};

module.exports = deleteEventSessionCommentConstants;
