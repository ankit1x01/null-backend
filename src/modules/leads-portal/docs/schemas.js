/**
 * Leads-portal Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetMyChaptersRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getMyChapters operation"
      }
    },
    "example": {
      "data": "Sample request data for getMyChapters"
    }
  },
  "GetMyChaptersResponse": {
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
        "example": "GetMyChapters successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getMyChapters operation"
      }
    }
  },
  "GetMyEventsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getMyEvents operation"
      }
    },
    "example": {
      "data": "Sample request data for getMyEvents"
    }
  },
  "GetMyEventsResponse": {
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
        "example": "GetMyEvents successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getMyEvents operation"
      }
    }
  },
  "GetMyStatsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getMyStats operation"
      }
    },
    "example": {
      "data": "Sample request data for getMyStats"
    }
  },
  "GetMyStatsResponse": {
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
        "example": "GetMyStats successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getMyStats operation"
      }
    }
  },
  "GetEventsNeedingAttentionRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventsNeedingAttention operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventsNeedingAttention"
    }
  },
  "GetEventsNeedingAttentionResponse": {
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
        "example": "GetEventsNeedingAttention successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventsNeedingAttention operation"
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
        "example": "SUCCESS0001"
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
        "example": "SUCCESS0001"
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
  "ExportRegistrationsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for exportRegistrations operation"
      }
    },
    "example": {
      "data": "Sample request data for exportRegistrations"
    }
  },
  "ExportRegistrationsResponse": {
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
        "example": "ExportRegistrations successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for exportRegistrations operation"
      }
    }
  },
  "MassUpdateRegistrationsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for massUpdateRegistrations operation"
      }
    },
    "example": {
      "data": "Sample request data for massUpdateRegistrations"
    }
  },
  "MassUpdateRegistrationsResponse": {
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
        "example": "MassUpdateRegistrations successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for massUpdateRegistrations operation"
      }
    }
  },
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
        "example": "SUCCESS0001"
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
        "example": "SUCCESS0001"
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
  "SuggestUserRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for suggestUser operation"
      }
    },
    "example": {
      "data": "Sample request data for suggestUser"
    }
  },
  "SuggestUserResponse": {
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
        "example": "SuggestUser successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for suggestUser operation"
      }
    }
  },
  "GetEventMailerTasksRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventMailerTasks operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventMailerTasks"
    }
  },
  "GetEventMailerTasksResponse": {
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
        "example": "GetEventMailerTasks successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventMailerTasks operation"
      }
    }
  },
  "GetEventMailerTaskByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventMailerTaskById operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventMailerTaskById"
    }
  },
  "GetEventMailerTaskByIdResponse": {
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
        "example": "GetEventMailerTaskById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventMailerTaskById operation"
      }
    }
  },
  "CreateEventMailerTaskRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createEventMailerTask operation"
      }
    },
    "example": {
      "data": "Sample request data for createEventMailerTask"
    }
  },
  "CreateEventMailerTaskResponse": {
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
        "example": "CreateEventMailerTask successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createEventMailerTask operation"
      }
    }
  },
  "UpdateEventMailerTaskRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateEventMailerTask operation"
      }
    },
    "example": {
      "data": "Sample request data for updateEventMailerTask"
    }
  },
  "UpdateEventMailerTaskResponse": {
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
        "example": "UpdateEventMailerTask successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateEventMailerTask operation"
      }
    }
  },
  "DeleteEventMailerTaskRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteEventMailerTask operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteEventMailerTask"
    }
  },
  "DeleteEventMailerTaskResponse": {
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
        "example": "DeleteEventMailerTask successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteEventMailerTask operation"
      }
    }
  },
  "ExecuteEventMailerTaskRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for executeEventMailerTask operation"
      }
    },
    "example": {
      "data": "Sample request data for executeEventMailerTask"
    }
  },
  "ExecuteEventMailerTaskResponse": {
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
        "example": "ExecuteEventMailerTask successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for executeEventMailerTask operation"
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
