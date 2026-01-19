/**
 * Pages Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
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
        "example": "GetPages successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getPageById operation"
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
