/**
 * Event-session-comments Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetEventSessionCommentsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventSessionComments operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventSessionComments"
    }
  },
  "GetEventSessionCommentsResponse": {
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
        "example": "GetEventSessionComments successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventSessionComments operation"
      }
    }
  },
  "GetEventSessionCommentByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventSessionCommentById operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventSessionCommentById"
    }
  },
  "GetEventSessionCommentByIdResponse": {
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
        "example": "GetEventSessionCommentById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventSessionCommentById operation"
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
