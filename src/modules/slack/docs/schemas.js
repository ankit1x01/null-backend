/**
 * Slack Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "SlackbotEventsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for slackbotEvents operation"
      }
    },
    "example": {
      "data": "Sample request data for slackbotEvents"
    }
  },
  "SlackbotEventsResponse": {
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
        "example": "SlackbotEvents successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for slackbotEvents operation"
      }
    }
  },
  "GetIntegrationsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getIntegrations operation"
      }
    },
    "example": {
      "data": "Sample request data for getIntegrations"
    }
  },
  "GetIntegrationsResponse": {
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
        "example": "GetIntegrations successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getIntegrations operation"
      }
    }
  },
  "GetIntegrationByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getIntegrationById operation"
      }
    },
    "example": {
      "data": "Sample request data for getIntegrationById"
    }
  },
  "GetIntegrationByIdResponse": {
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
        "example": "GetIntegrationById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getIntegrationById operation"
      }
    }
  },
  "GetIntegrationByChapterRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getIntegrationByChapter operation"
      }
    },
    "example": {
      "data": "Sample request data for getIntegrationByChapter"
    }
  },
  "GetIntegrationByChapterResponse": {
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
        "example": "GetIntegrationByChapter successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getIntegrationByChapter operation"
      }
    }
  },
  "GetNotificationLogsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getNotificationLogs operation"
      }
    },
    "example": {
      "data": "Sample request data for getNotificationLogs"
    }
  },
  "GetNotificationLogsResponse": {
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
        "example": "GetNotificationLogs successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getNotificationLogs operation"
      }
    }
  },
  "CreateIntegrationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createIntegration operation"
      }
    },
    "example": {
      "data": "Sample request data for createIntegration"
    }
  },
  "CreateIntegrationResponse": {
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
        "example": "CreateIntegration successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createIntegration operation"
      }
    }
  },
  "UpdateIntegrationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateIntegration operation"
      }
    },
    "example": {
      "data": "Sample request data for updateIntegration"
    }
  },
  "UpdateIntegrationResponse": {
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
        "example": "UpdateIntegration successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateIntegration operation"
      }
    }
  },
  "DeleteIntegrationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteIntegration operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteIntegration"
    }
  },
  "DeleteIntegrationResponse": {
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
        "example": "DeleteIntegration successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteIntegration operation"
      }
    }
  },
  "ToggleActiveRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for toggleActive operation"
      }
    },
    "example": {
      "data": "Sample request data for toggleActive"
    }
  },
  "ToggleActiveResponse": {
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
        "example": "ToggleActive successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for toggleActive operation"
      }
    }
  },
  "TestWebhookRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for testWebhook operation"
      }
    },
    "example": {
      "data": "Sample request data for testWebhook"
    }
  },
  "TestWebhookResponse": {
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
        "example": "TestWebhook successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for testWebhook operation"
      }
    }
  },
  "NotifyNewEventRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for notifyNewEvent operation"
      }
    },
    "example": {
      "data": "Sample request data for notifyNewEvent"
    }
  },
  "NotifyNewEventResponse": {
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
        "example": "NotifyNewEvent successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for notifyNewEvent operation"
      }
    }
  },
  "NotifyEventUpdateRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for notifyEventUpdate operation"
      }
    },
    "example": {
      "data": "Sample request data for notifyEventUpdate"
    }
  },
  "NotifyEventUpdateResponse": {
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
        "example": "NotifyEventUpdate successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for notifyEventUpdate operation"
      }
    }
  },
  "NotifyNewSessionRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for notifyNewSession operation"
      }
    },
    "example": {
      "data": "Sample request data for notifyNewSession"
    }
  },
  "NotifyNewSessionResponse": {
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
        "example": "NotifyNewSession successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for notifyNewSession operation"
      }
    }
  },
  "SendCustomNotificationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for sendCustomNotification operation"
      }
    },
    "example": {
      "data": "Sample request data for sendCustomNotification"
    }
  },
  "SendCustomNotificationResponse": {
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
        "example": "SendCustomNotification successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for sendCustomNotification operation"
      }
    }
  },
  "RetryNotificationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for retryNotification operation"
      }
    },
    "example": {
      "data": "Sample request data for retryNotification"
    }
  },
  "RetryNotificationResponse": {
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
        "example": "RetryNotification successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for retryNotification operation"
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
