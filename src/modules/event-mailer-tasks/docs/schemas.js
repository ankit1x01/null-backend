/**
 * Event-mailer-tasks Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetMailerTasksRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getMailerTasks operation"
      }
    },
    "example": {
      "data": "Sample request data for getMailerTasks"
    }
  },
  "GetMailerTasksResponse": {
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
        "example": "GetMailerTasks successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getMailerTasks operation"
      }
    }
  },
  "GetMailerTaskByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getMailerTaskById operation"
      }
    },
    "example": {
      "data": "Sample request data for getMailerTaskById"
    }
  },
  "GetMailerTaskByIdResponse": {
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
        "example": "GetMailerTaskById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getMailerTaskById operation"
      }
    }
  },
  "PreviewRecipientsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for previewRecipients operation"
      }
    },
    "example": {
      "data": "Sample request data for previewRecipients"
    }
  },
  "PreviewRecipientsResponse": {
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
        "example": "PreviewRecipients successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for previewRecipients operation"
      }
    }
  },
  "CreateMailerTaskRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createMailerTask operation"
      }
    },
    "example": {
      "data": "Sample request data for createMailerTask"
    }
  },
  "CreateMailerTaskResponse": {
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
        "example": "CreateMailerTask successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createMailerTask operation"
      }
    }
  },
  "UpdateMailerTaskRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateMailerTask operation"
      }
    },
    "example": {
      "data": "Sample request data for updateMailerTask"
    }
  },
  "UpdateMailerTaskResponse": {
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
        "example": "UpdateMailerTask successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateMailerTask operation"
      }
    }
  },
  "ExecuteMailerTaskRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for executeMailerTask operation"
      }
    },
    "example": {
      "data": "Sample request data for executeMailerTask"
    }
  },
  "ExecuteMailerTaskResponse": {
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
        "example": "ExecuteMailerTask successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for executeMailerTask operation"
      }
    }
  },
  "DeleteMailerTaskRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteMailerTask operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteMailerTask"
    }
  },
  "DeleteMailerTaskResponse": {
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
        "example": "DeleteMailerTask successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteMailerTask operation"
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
