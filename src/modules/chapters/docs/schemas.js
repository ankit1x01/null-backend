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
        "example": "GetChapterById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapterById operation"
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
