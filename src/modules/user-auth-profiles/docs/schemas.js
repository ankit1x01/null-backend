/**
 * User-auth-profiles Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetMyProfilesRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getMyProfiles operation"
      }
    },
    "example": {
      "data": "Sample request data for getMyProfiles"
    }
  },
  "GetMyProfilesResponse": {
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
        "example": "GetMyProfiles successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getMyProfiles operation"
      }
    }
  },
  "LinkProviderRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for linkProvider operation"
      }
    },
    "example": {
      "data": "Sample request data for linkProvider"
    }
  },
  "LinkProviderResponse": {
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
        "example": "LinkProvider successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for linkProvider operation"
      }
    }
  },
  "UnlinkProviderRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for unlinkProvider operation"
      }
    },
    "example": {
      "data": "Sample request data for unlinkProvider"
    }
  },
  "UnlinkProviderResponse": {
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
        "example": "UnlinkProvider successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for unlinkProvider operation"
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
