/**
 * User-api-tokens Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetMyTokensRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getMyTokens operation"
      }
    },
    "example": {
      "data": "Sample request data for getMyTokens"
    }
  },
  "GetMyTokensResponse": {
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
        "example": "GetMyTokens successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getMyTokens operation"
      }
    }
  },
  "CreateTokenRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createToken operation"
      }
    },
    "example": {
      "data": "Sample request data for createToken"
    }
  },
  "CreateTokenResponse": {
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
        "example": "CreateToken successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createToken operation"
      }
    }
  },
  "UpdateTokenRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateToken operation"
      }
    },
    "example": {
      "data": "Sample request data for updateToken"
    }
  },
  "UpdateTokenResponse": {
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
        "example": "UpdateToken successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateToken operation"
      }
    }
  },
  "RegenerateTokenRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for regenerateToken operation"
      }
    },
    "example": {
      "data": "Sample request data for regenerateToken"
    }
  },
  "RegenerateTokenResponse": {
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
        "example": "RegenerateToken successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for regenerateToken operation"
      }
    }
  },
  "RevokeTokenRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for revokeToken operation"
      }
    },
    "example": {
      "data": "Sample request data for revokeToken"
    }
  },
  "RevokeTokenResponse": {
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
        "example": "RevokeToken successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for revokeToken operation"
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
