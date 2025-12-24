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
        "example": "GetEvents successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventById operation"
      }
    }
  },
  "CreateEventRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createEvent operation"
      }
    },
    "example": {
      "data": "Sample request data for createEvent"
    }
  },
  "CreateEventResponse": {
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
        "example": "CreateEvent successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createEvent operation"
      }
    }
  },
  "UpdateEventRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateEvent operation"
      }
    },
    "example": {
      "data": "Sample request data for updateEvent"
    }
  },
  "UpdateEventResponse": {
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
        "example": "UpdateEvent successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateEvent operation"
      }
    }
  },
  "DeleteEventRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteEvent operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteEvent"
    }
  },
  "DeleteEventResponse": {
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
        "example": "DeleteEvent successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteEvent operation"
      }
    }
  },
  "GenerateICSRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for generateICS operation"
      }
    },
    "example": {
      "data": "Sample request data for generateICS"
    }
  },
  "GenerateICSResponse": {
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
        "example": "GenerateICS successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for generateICS operation"
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
