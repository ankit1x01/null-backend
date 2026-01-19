/**
 * Chapter-leads Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
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
        "example": "GetChapterLeads successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapterLeadById operation"
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
