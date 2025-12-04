/**
 * ChapterLeads Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "CreateChapterLeadRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createChapterLead operation"
      }
    },
    "example": {
      "data": "Sample request data for createChapterLead"
    }
  },
  "CreateChapterLeadResponse": {
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
        "example": "CreateChapterLead successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createChapterLead operation"
      }
    }
  },
  "GetChapterLeadsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getChapterLeads operation"
      }
    },
    "example": {
      "data": "Sample request data for getChapterLeads"
    }
  },
  "GetChapterLeadsResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETCS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetChapterLeads successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapterLeads operation"
      }
    }
  },
  "GetChapterLeadByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getChapterLeadById operation"
      }
    },
    "example": {
      "data": "Sample request data for getChapterLeadById"
    }
  },
  "GetChapterLeadByIdResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETCS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetChapterLeadById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapterLeadById operation"
      }
    }
  },
  "UpdateChapterLeadRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateChapterLead operation"
      }
    },
    "example": {
      "data": "Sample request data for updateChapterLead"
    }
  },
  "UpdateChapterLeadResponse": {
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
        "example": "UpdateChapterLead successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateChapterLead operation"
      }
    }
  },
  "DeleteChapterLeadRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteChapterLead operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteChapterLead"
    }
  },
  "DeleteChapterLeadResponse": {
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
        "example": "DeleteChapterLead successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteChapterLead operation"
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
