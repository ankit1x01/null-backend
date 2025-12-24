/**
 * Chapters Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetChaptersRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getChapters operation"
      }
    },
    "example": {
      "data": "Sample request data for getChapters"
    }
  },
  "GetChaptersResponse": {
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
        "example": "GetChapters successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapters operation"
      }
    }
  },
  "GetChapterByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getChapterById operation"
      }
    },
    "example": {
      "data": "Sample request data for getChapterById"
    }
  },
  "GetChapterByIdResponse": {
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
        "example": "GetChapters successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapterById operation"
      }
    }
  },
  "CreateChapterRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createChapter operation"
      }
    },
    "example": {
      "data": "Sample request data for createChapter"
    }
  },
  "CreateChapterResponse": {
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
        "example": "CreateChapter successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createChapter operation"
      }
    }
  },
  "UpdateChapterRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateChapter operation"
      }
    },
    "example": {
      "data": "Sample request data for updateChapter"
    }
  },
  "UpdateChapterResponse": {
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
        "example": "UpdateChapter successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateChapter operation"
      }
    }
  },
  "DeleteChapterRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteChapter operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteChapter"
    }
  },
  "DeleteChapterResponse": {
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
        "example": "DeleteChapter successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteChapter operation"
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
