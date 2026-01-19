/**
 * Event-notifications Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetNotificationsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getNotifications operation"
      }
    },
    "example": {
      "data": "Sample request data for getNotifications"
    }
  },
  "GetNotificationsResponse": {
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
        "example": "GetNotifications successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getNotifications operation"
      }
    }
  },
  "GetNotificationByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getNotificationById operation"
      }
    },
    "example": {
      "data": "Sample request data for getNotificationById"
    }
  },
  "GetNotificationByIdResponse": {
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
        "example": "GetNotificationById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getNotificationById operation"
      }
    }
  },
  "GetNotificationsByEventRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getNotificationsByEvent operation"
      }
    },
    "example": {
      "data": "Sample request data for getNotificationsByEvent"
    }
  },
  "GetNotificationsByEventResponse": {
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
        "example": "GetNotificationsByEvent successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getNotificationsByEvent operation"
      }
    }
  },
  "CreateNotificationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createNotification operation"
      }
    },
    "example": {
      "data": "Sample request data for createNotification"
    }
  },
  "CreateNotificationResponse": {
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
        "example": "CreateNotification successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createNotification operation"
      }
    }
  },
  "ScheduleEventNotificationsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for scheduleEventNotifications operation"
      }
    },
    "example": {
      "data": "Sample request data for scheduleEventNotifications"
    }
  },
  "ScheduleEventNotificationsResponse": {
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
        "example": "ScheduleEventNotifications successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for scheduleEventNotifications operation"
      }
    }
  },
  "UpdateNotificationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateNotification operation"
      }
    },
    "example": {
      "data": "Sample request data for updateNotification"
    }
  },
  "UpdateNotificationResponse": {
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
        "example": "UpdateNotification successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateNotification operation"
      }
    }
  },
  "SendNotificationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for sendNotification operation"
      }
    },
    "example": {
      "data": "Sample request data for sendNotification"
    }
  },
  "SendNotificationResponse": {
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
        "example": "SendNotification successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for sendNotification operation"
      }
    }
  },
  "ProcessPendingNotificationsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for processPendingNotifications operation"
      }
    },
    "example": {
      "data": "Sample request data for processPendingNotifications"
    }
  },
  "ProcessPendingNotificationsResponse": {
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
        "example": "ProcessPendingNotifications successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for processPendingNotifications operation"
      }
    }
  },
  "CancelEventNotificationsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for cancelEventNotifications operation"
      }
    },
    "example": {
      "data": "Sample request data for cancelEventNotifications"
    }
  },
  "CancelEventNotificationsResponse": {
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
        "example": "CancelEventNotifications successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for cancelEventNotifications operation"
      }
    }
  },
  "DeleteNotificationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteNotification operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteNotification"
    }
  },
  "DeleteNotificationResponse": {
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
        "example": "DeleteNotification successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteNotification operation"
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
