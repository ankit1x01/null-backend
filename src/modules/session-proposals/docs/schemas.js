/**
 * Session-proposals Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetSessionProposalsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getSessionProposals operation"
      }
    },
    "example": {
      "data": "Sample request data for getSessionProposals"
    }
  },
  "GetSessionProposalsResponse": {
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
        "example": "GetSessionProposals successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getSessionProposals operation"
      }
    }
  },
  "GetSessionProposalByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getSessionProposalById operation"
      }
    },
    "example": {
      "data": "Sample request data for getSessionProposalById"
    }
  },
  "GetSessionProposalByIdResponse": {
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
        "example": "GetSessionProposalById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getSessionProposalById operation"
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
