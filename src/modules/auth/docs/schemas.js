/**
 * Auth Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "LoginRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for login operation"
      }
    },
    "example": {
      "data": "Sample request data for login"
    }
  },
  "LoginResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "Login successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for login operation"
      }
    }
  },
  "RegisterRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for register operation"
      }
    },
    "example": {
      "data": "Sample request data for register"
    }
  },
  "RegisterResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "Register successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for register operation"
      }
    }
  },
  "ErrorResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "ERROR0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 400
      },
      "message": {
        "type": "string",
        "example": "Error message"
      }
    }
  }
};
