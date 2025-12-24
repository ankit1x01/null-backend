/**
 * Event-sessions Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "CreateEventSessionRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createEventSession operation"
      }
    },
    "example": {
      "data": "Sample request data for createEventSession"
    }
  },
  "CreateEventSessionResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "CREAS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "CreateEventSession successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createEventSession operation"
      }
    }
  },
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
  "UpdateEventSessionRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateEventSession operation"
      }
    },
    "example": {
      "data": "Sample request data for updateEventSession"
    }
  },
  "UpdateEventSessionResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "UPDAS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "UpdateEventSession successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateEventSession operation"
      }
    }
  },
  "DeleteEventSessionRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteEventSession operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteEventSession"
    }
  },
  "DeleteEventSessionResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "DELES0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "DeleteEventSession successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteEventSession operation"
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
