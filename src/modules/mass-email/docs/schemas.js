/**
 * Mass-email Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetTemplatesRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getTemplates operation"
      }
    },
    "example": {
      "data": "Sample request data for getTemplates"
    }
  },
  "GetTemplatesResponse": {
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
        "example": "GetTemplates successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getTemplates operation"
      }
    }
  },
  "GetCampaignsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getCampaigns operation"
      }
    },
    "example": {
      "data": "Sample request data for getCampaigns"
    }
  },
  "GetCampaignsResponse": {
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
        "example": "GetCampaigns successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getCampaigns operation"
      }
    }
  },
  "GetCampaignByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getCampaignById operation"
      }
    },
    "example": {
      "data": "Sample request data for getCampaignById"
    }
  },
  "GetCampaignByIdResponse": {
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
        "example": "GetCampaignById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getCampaignById operation"
      }
    }
  },
  "GetCampaignStatsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getCampaignStats operation"
      }
    },
    "example": {
      "data": "Sample request data for getCampaignStats"
    }
  },
  "GetCampaignStatsResponse": {
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
        "example": "GetCampaignStats successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getCampaignStats operation"
      }
    }
  },
  "CreateCampaignRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createCampaign operation"
      }
    },
    "example": {
      "data": "Sample request data for createCampaign"
    }
  },
  "CreateCampaignResponse": {
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
        "example": "CreateCampaign successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createCampaign operation"
      }
    }
  },
  "UpdateCampaignRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateCampaign operation"
      }
    },
    "example": {
      "data": "Sample request data for updateCampaign"
    }
  },
  "UpdateCampaignResponse": {
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
        "example": "UpdateCampaign successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateCampaign operation"
      }
    }
  },
  "DeleteCampaignRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteCampaign operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteCampaign"
    }
  },
  "DeleteCampaignResponse": {
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
        "example": "DeleteCampaign successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteCampaign operation"
      }
    }
  },
  "GetEventRecipientsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventRecipients operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventRecipients"
    }
  },
  "GetEventRecipientsResponse": {
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
        "example": "GetEventRecipients successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventRecipients operation"
      }
    }
  },
  "GetChapterRecipientsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getChapterRecipients operation"
      }
    },
    "example": {
      "data": "Sample request data for getChapterRecipients"
    }
  },
  "GetChapterRecipientsResponse": {
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
        "example": "GetChapterRecipients successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapterRecipients operation"
      }
    }
  },
  "AddRecipientsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for addRecipients operation"
      }
    },
    "example": {
      "data": "Sample request data for addRecipients"
    }
  },
  "AddRecipientsResponse": {
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
        "example": "AddRecipients successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for addRecipients operation"
      }
    }
  },
  "RemoveRecipientRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for removeRecipient operation"
      }
    },
    "example": {
      "data": "Sample request data for removeRecipient"
    }
  },
  "RemoveRecipientResponse": {
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
        "example": "RemoveRecipient successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for removeRecipient operation"
      }
    }
  },
  "SendCampaignRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for sendCampaign operation"
      }
    },
    "example": {
      "data": "Sample request data for sendCampaign"
    }
  },
  "SendCampaignResponse": {
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
        "example": "SendCampaign successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for sendCampaign operation"
      }
    }
  },
  "ScheduleCampaignRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for scheduleCampaign operation"
      }
    },
    "example": {
      "data": "Sample request data for scheduleCampaign"
    }
  },
  "ScheduleCampaignResponse": {
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
        "example": "ScheduleCampaign successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for scheduleCampaign operation"
      }
    }
  },
  "CancelScheduledCampaignRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for cancelScheduledCampaign operation"
      }
    },
    "example": {
      "data": "Sample request data for cancelScheduledCampaign"
    }
  },
  "CancelScheduledCampaignResponse": {
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
        "example": "CancelScheduledCampaign successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for cancelScheduledCampaign operation"
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
