/**
 * Twitter Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
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
  "TweetEventRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for tweetEvent operation"
      }
    },
    "example": {
      "data": "Sample request data for tweetEvent"
    }
  },
  "TweetEventResponse": {
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
        "example": "TweetEvent successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for tweetEvent operation"
      }
    }
  },
  "RetryTweetRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for retryTweet operation"
      }
    },
    "example": {
      "data": "Sample request data for retryTweet"
    }
  },
  "RetryTweetResponse": {
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
        "example": "RetryTweet successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for retryTweet operation"
      }
    }
  },
  "GetTweetHistoryRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getTweetHistory operation"
      }
    },
    "example": {
      "data": "Sample request data for getTweetHistory"
    }
  },
  "GetTweetHistoryResponse": {
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
        "example": "GetTweetHistory successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getTweetHistory operation"
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
