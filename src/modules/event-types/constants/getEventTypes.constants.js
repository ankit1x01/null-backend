/**
 * GetEventTypes Constants
 * Contains message codes, texts, and status codes for getEventTypes operations
 */

const getEventTypesConstants = {
  messages: {
    GETES0001: {
      code: "GETES0001",
      statusCode: 200,
      message: "GetEventTypes successful",
    },
  },
  errorMessages: {
    GETEE0001: {
      code: "GETEE0001",
      statusCode: 400,
      message: "Required field is missing",
    },
    GETEE0002: {
      code: "GETEE0002",
      statusCode: 400,
      message: "Invalid input format",
    },
    GETEE0003: {
      code: "GETEE0003",
      statusCode: 404,
      message: "GetEventTypes failed",
    },
  },
};

module.exports = getEventTypesConstants;
