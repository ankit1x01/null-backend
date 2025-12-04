/**
 * CreateEventSession Constants
 * Contains message codes, texts, and status codes for createEventSession operations
 */

const createEventSessionConstants = {
  messages: {
    CREAS0001: {
      code: "CREAS0001",
      statusCode: 200,
      message: "CreateEventSession successful",
    },
  },
  errorMessages: {
    CREAE0001: {
      code: "CREAE0001",
      statusCode: 400,
      message: "Required field is missing",
    },
    CREAE0002: {
      code: "CREAE0002",
      statusCode: 400,
      message: "Invalid input format",
    },
    CREAE0003: {
      code: "CREAE0003",
      statusCode: 404,
      message: "CreateEventSession failed",
    },
  },
};

module.exports = createEventSessionConstants;
