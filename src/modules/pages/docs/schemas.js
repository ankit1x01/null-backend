/**
 * Pages Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "CreatePageRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createPage operation"
      }
    },
    "example": {
      "data": "Sample request data for createPage"
    }
  },
  "CreatePageResponse": {
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
        "example": "CreatePage successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createPage operation"
      }
    }
  },
  "GetPagesRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getPages operation"
      }
    },
    "example": {
      "data": "Sample request data for getPages"
    }
  },
  "GetPagesResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETPS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetPages successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getPages operation"
      }
    }
  },
  "GetPageByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getPageById operation"
      }
    },
    "example": {
      "data": "Sample request data for getPageById"
    }
  },
  "GetPageByIdResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "GETPS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetPageById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getPageById operation"
      }
    }
  },
  "UpdatePageRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updatePage operation"
      }
    },
    "example": {
      "data": "Sample request data for updatePage"
    }
  },
  "UpdatePageResponse": {
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
        "example": "UpdatePage successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updatePage operation"
      }
    }
  },
  "DeletePageRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deletePage operation"
      }
    },
    "example": {
      "data": "Sample request data for deletePage"
    }
  },
  "DeletePageResponse": {
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
        "example": "DeletePage successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deletePage operation"
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
