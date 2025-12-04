/**
 * UpdateEventRegistration Constants
 * Contains message codes, texts, and status codes for updateEventRegistration operations
 */

const updateEventRegistrationConstants = {
  messages: {
    UPDAS0001: {
      code: "UPDAS0001",
      statusCode: 200,
      message: "UpdateEventRegistration successful",
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
      message: "UpdateEventRegistration failed",
    },
  },
};

module.exports = updateEventRegistrationConstants;
