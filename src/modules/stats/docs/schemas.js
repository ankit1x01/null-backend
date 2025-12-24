/**
 * Stats Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetDashboardStatsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getDashboardStats operation"
      }
    },
    "example": {
      "data": "Sample request data for getDashboardStats"
    }
  },
  "GetDashboardStatsResponse": {
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
        "example": "GetDashboardStats successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getDashboardStats operation"
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
