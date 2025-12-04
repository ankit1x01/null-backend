/**
 * Users Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetMeRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getMe operation"
      }
    },
    "example": {
      "data": "Sample request data for getMe"
    }
  },
  "GetMeResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETMS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetMe successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getMe operation"
      }
    }
  },
  "GetUserEventsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getUserEvents operation"
      }
    },
    "example": {
      "data": "Sample request data for getUserEvents"
    }
  },
  "GetUserEventsResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETUS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetUserEvents successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getUserEvents operation"
      }
    }
  },
  "GetUserSessionsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getUserSessions operation"
      }
    },
    "example": {
      "data": "Sample request data for getUserSessions"
    }
  },
  "GetUserSessionsResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETUS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetUserSessions successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getUserSessions operation"
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
