/**
 * Page-permissions Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "CreatePagePermissionRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createPagePermission operation"
      }
    },
    "example": {
      "data": "Sample request data for createPagePermission"
    }
  },
  "CreatePagePermissionResponse": {
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
        "example": "CreatePagePermission successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createPagePermission operation"
      }
    }
  },
  "UpdatePagePermissionRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updatePagePermission operation"
      }
    },
    "example": {
      "data": "Sample request data for updatePagePermission"
    }
  },
  "UpdatePagePermissionResponse": {
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
        "example": "UpdatePagePermission successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updatePagePermission operation"
      }
    }
  },
  "DeletePagePermissionRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deletePagePermission operation"
      }
    },
    "example": {
      "data": "Sample request data for deletePagePermission"
    }
  },
  "DeletePagePermissionResponse": {
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
        "example": "DeletePagePermission successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deletePagePermission operation"
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
