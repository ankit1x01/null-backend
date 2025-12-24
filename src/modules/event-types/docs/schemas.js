/**
 * Event-types Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "CreateEventTypeRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createEventType operation"
      }
    },
    "example": {
      "data": "Sample request data for createEventType"
    }
  },
  "CreateEventTypeResponse": {
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
        "example": "CreateEventType successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createEventType operation"
      }
    }
  },
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
  "UpdateEventTypeRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateEventType operation"
      }
    },
    "example": {
      "data": "Sample request data for updateEventType"
    }
  },
  "UpdateEventTypeResponse": {
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
        "example": "UpdateEventType successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateEventType operation"
      }
    }
  },
  "DeleteEventTypeRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteEventType operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteEventType"
    }
  },
  "DeleteEventTypeResponse": {
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
        "example": "DeleteEventType successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteEventType operation"
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
