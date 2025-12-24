/**
 * User-achievements Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetUserAchievementsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getUserAchievements operation"
      }
    },
    "example": {
      "data": "Sample request data for getUserAchievements"
    }
  },
  "GetUserAchievementsResponse": {
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
        "example": "GetUserAchievements successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getUserAchievements operation"
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
