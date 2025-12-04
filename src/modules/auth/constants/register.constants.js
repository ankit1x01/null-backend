/**
 * Register Constants
 * Contains message codes, texts, and status codes for user registration operations
 */

const registerConstants = {
  messages: {
    USRS0002: {
      code: "USRS0002",
      statusCode: 201,
      message: "User registered successfully",
    },
  },
  errorMessages: {
    USRE0004: {
      code: "USRE0004",
      statusCode: 400,
      message: "Email is required",
    },
    USRE0005: {
      code: "USRE0005",
      statusCode: 400,
      message: "Password is required",
    },
    USRE0006: {
      code: "USRE0006",
      statusCode: 400,
      message: "Name is required",
    },
    USRE0007: {
      code: "USRE0007",
      statusCode: 409,
      message: "Email already exists",
    },
    USRE0008: {
      code: "USRE0008",
      statusCode: 400,
      message: "Invalid email format",
    },
  },
};

module.exports = registerConstants;
