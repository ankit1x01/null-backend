/**
 * Session-requests Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetSessionRequestsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getSessionRequests operation"
      }
    },
    "example": {
      "data": "Sample request data for getSessionRequests"
    }
  },
  "GetSessionRequestsResponse": {
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
        "example": "GetSessionRequests successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getSessionRequests operation"
      }
    }
  },
  "GetSessionRequestByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getSessionRequestById operation"
      }
    },
    "example": {
      "data": "Sample request data for getSessionRequestById"
    }
  },
  "GetSessionRequestByIdResponse": {
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
        "example": "GetSessionRequestById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getSessionRequestById operation"
      }
    }
  },
  "CreateSessionRequestRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createSessionRequest operation"
      }
    },
    "example": {
      "data": "Sample request data for createSessionRequest"
    }
  },
  "CreateSessionRequestResponse": {
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
        "example": "CreateSessionRequest successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createSessionRequest operation"
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
