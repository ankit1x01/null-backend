/**
 * Event-types Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetEventTypesRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventTypes operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventTypes"
    }
  },
  "GetEventTypesResponse": {
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
        "example": "GetEventTypes successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventTypes operation"
      }
    }
  },
  "GetEventTypeByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventTypeById operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventTypeById"
    }
  },
  "GetEventTypeByIdResponse": {
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
        "example": "GetEventTypes successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventTypeById operation"
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
