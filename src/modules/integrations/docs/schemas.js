/**
 * Integrations Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "HandleSlackEventsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for handleSlackEvents operation"
      }
    },
    "example": {
      "data": "Sample request data for handleSlackEvents"
    }
  },
  "HandleSlackEventsResponse": {
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
        "example": "HandleSlackEvents successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for handleSlackEvents operation"
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
