/**
 * CreatePagePermission Constants
 * Contains message codes, texts, and status codes for createPagePermission operations
 */

const createPagePermissionConstants = {
  messages: {
    CREAS0001: {
      code: "CREAS0001",
      statusCode: 200,
      message: "CreatePagePermission successful",
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
      message: "CreatePagePermission failed",
    },
  },
};

module.exports = createPagePermissionConstants;
