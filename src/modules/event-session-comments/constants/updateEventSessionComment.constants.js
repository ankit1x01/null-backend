/**
 * UpdateEventSessionComment Constants
 * Contains message codes, texts, and status codes for updateEventSessionComment operations
 */

const updateEventSessionCommentConstants = {
  messages: {
    UPDAS0001: {
      code: "UPDAS0001",
      statusCode: 200,
      message: "UpdateEventSessionComment successful",
    },
  },
  errorMessages: {
    UPDAE0001: {
      code: "UPDAE0001",
      statusCode: 400,
      message: "Required field is missing",
    },
    UPDAE0002: {
      code: "UPDAE0002",
      statusCode: 400,
      message: "Invalid input format",
    },
    UPDAE0003: {
      code: "UPDAE0003",
      statusCode: 404,
      message: "UpdateEventSessionComment failed",
    },
  },
};

module.exports = updateEventSessionCommentConstants;
