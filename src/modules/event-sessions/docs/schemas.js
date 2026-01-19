/**
 * Event-sessions Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetEventSessionsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventSessions operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventSessions"
    }
  },
  "GetEventSessionsResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETES0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetEventSessions successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventSessions operation"
      }
    }
  },
  "GetEventSessionByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventSessionById operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventSessionById"
    }
  },
  "GetEventSessionByIdResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETES0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetEventSessions successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventSessionById operation"
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
