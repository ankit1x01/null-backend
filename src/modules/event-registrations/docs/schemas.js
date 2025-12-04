/**
 * EventRegistrations Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "CreateEventRegistrationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createEventRegistration operation"
      }
    },
    "example": {
      "data": "Sample request data for createEventRegistration"
    }
  },
  "CreateEventRegistrationResponse": {
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
        "example": "CreateEventRegistration successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createEventRegistration operation"
      }
    }
  },
  "GetEventRegistrationsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventRegistrations operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventRegistrations"
    }
  },
  "GetEventRegistrationsResponse": {
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
        "example": "GetEventRegistrations successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventRegistrations operation"
      }
    }
  },
  "GetEventRegistrationByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventRegistrationById operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventRegistrationById"
    }
  },
  "GetEventRegistrationByIdResponse": {
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
        "example": "GetEventRegistrationById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventRegistrationById operation"
      }
    }
  },
  "UpdateEventRegistrationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateEventRegistration operation"
      }
    },
    "example": {
      "data": "Sample request data for updateEventRegistration"
    }
  },
  "UpdateEventRegistrationResponse": {
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
        "example": "UpdateEventRegistration successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateEventRegistration operation"
      }
    }
  },
  "DeleteEventRegistrationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteEventRegistration operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteEventRegistration"
    }
  },
  "DeleteEventRegistrationResponse": {
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
        "example": "DeleteEventRegistration successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteEventRegistration operation"
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
