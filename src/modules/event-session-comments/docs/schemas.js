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
  "CreateEventSessionCommentRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createEventSessionComment operation"
      }
    },
    "example": {
      "data": "Sample request data for createEventSessionComment"
    }
  },
  "CreateEventSessionCommentResponse": {
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
        "example": "CreateEventSessionComment successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createEventSessionComment operation"
      }
    }
  },
  "UpdateEventSessionCommentRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateEventSessionComment operation"
      }
    },
    "example": {
      "data": "Sample request data for updateEventSessionComment"
    }
  },
  "UpdateEventSessionCommentResponse": {
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
        "example": "UpdateEventSessionComment successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateEventSessionComment operation"
      }
    }
  },
  "DeleteEventSessionCommentRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteEventSessionComment operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteEventSessionComment"
    }
  },
  "DeleteEventSessionCommentResponse": {
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
        "example": "DeleteEventSessionComment successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteEventSessionComment operation"
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
