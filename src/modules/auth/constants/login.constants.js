/**
 * Login Constants
 * Contains message codes, texts, and status codes for login operations
 */

const loginConstants = {
  messages: {
    USRS0001: {
      code: "USRS0001",
      statusCode: 200,
      message: "Login successful",
    },
  },
  errorMessages: {
    USRE0001: {
      code: "USRE0001",
      statusCode: 400,
      message: "Email is required",
    },
    USRE0002: {
      code: "USRE0002",
      statusCode: 400,
      message: "Password is required",
    },
    USRE0003: {
      code: "USRE0003",
      statusCode: 400,
      message: "Invalid password",
    },
    USRE0004: {
      code: "USRE0004",
      statusCode: 400,
      message: "User not found",
    },
    USRE0008: {
      code: "USRE0008",
      statusCode: 400,
      message: "Invalid email format",
    },
  },
};

module.exports = loginConstants;
