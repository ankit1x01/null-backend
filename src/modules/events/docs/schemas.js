/**
 * Events Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetEventsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEvents operation"
      }
    },
    "example": {
      "data": "Sample request data for getEvents"
    }
  },
  "GetEventsResponse": {
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
        "example": "GetEvents successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEvents operation"
      }
    }
  },
  "GetEventByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventById operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventById"
    }
  },
  "GetEventByIdResponse": {
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
        "example": "GetEventById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventById operation"
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
