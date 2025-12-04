/**
 * GetChapterLeadById Constants
 * Contains message codes, texts, and status codes for getChapterLeadById operations
 */

const getChapterLeadByIdConstants = {
  messages: {
    GETCS0001: {
      code: "GETCS0001",
      statusCode: 200,
      message: "GetChapterLeadById successful",
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
      message: "GetChapterLeadById failed",
    },
  },
};

module.exports = getChapterLeadByIdConstants;
