/**
 * Oauth Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetGitHubAuthUrlRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getGitHubAuthUrl operation"
      }
    },
    "example": {
      "data": "Sample request data for getGitHubAuthUrl"
    }
  },
  "GetGitHubAuthUrlResponse": {
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
        "example": "GetGitHubAuthUrl successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getGitHubAuthUrl operation"
      }
    }
  },
  "GetGoogleAuthUrlRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getGoogleAuthUrl operation"
      }
    },
    "example": {
      "data": "Sample request data for getGoogleAuthUrl"
    }
  },
  "GetGoogleAuthUrlResponse": {
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
        "example": "GetGoogleAuthUrl successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getGoogleAuthUrl operation"
      }
    }
  },
  "HandleGitHubCallbackRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for handleGitHubCallback operation"
      }
    },
    "example": {
      "data": "Sample request data for handleGitHubCallback"
    }
  },
  "HandleGitHubCallbackResponse": {
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
        "example": "HandleGitHubCallback successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for handleGitHubCallback operation"
      }
    }
  },
  "HandleGoogleCallbackRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for handleGoogleCallback operation"
      }
    },
    "example": {
      "data": "Sample request data for handleGoogleCallback"
    }
  },
  "HandleGoogleCallbackResponse": {
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
        "example": "HandleGoogleCallback successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for handleGoogleCallback operation"
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
