/**
 * Admin-users Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "AdminLoginRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for adminLogin operation"
      }
    },
    "example": {
      "data": "Sample request data for adminLogin"
    }
  },
  "AdminLoginResponse": {
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
        "example": "AdminLogin successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for adminLogin operation"
      }
    }
  },
  "GetAdminUsersRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getAdminUsers operation"
      }
    },
    "example": {
      "data": "Sample request data for getAdminUsers"
    }
  },
  "GetAdminUsersResponse": {
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
        "example": "GetAdminUsers successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getAdminUsers operation"
      }
    }
  },
  "GetAdminUserByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getAdminUserById operation"
      }
    },
    "example": {
      "data": "Sample request data for getAdminUserById"
    }
  },
  "GetAdminUserByIdResponse": {
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
        "example": "GetAdminUserById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getAdminUserById operation"
      }
    }
  },
  "CreateAdminUserRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createAdminUser operation"
      }
    },
    "example": {
      "data": "Sample request data for createAdminUser"
    }
  },
  "CreateAdminUserResponse": {
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
        "example": "CreateAdminUser successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createAdminUser operation"
      }
    }
  },
  "UpdateAdminUserRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateAdminUser operation"
      }
    },
    "example": {
      "data": "Sample request data for updateAdminUser"
    }
  },
  "UpdateAdminUserResponse": {
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
        "example": "UpdateAdminUser successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateAdminUser operation"
      }
    }
  },
  "ToggleActiveRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for toggleActive operation"
      }
    },
    "example": {
      "data": "Sample request data for toggleActive"
    }
  },
  "ToggleActiveResponse": {
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
        "example": "ToggleActive successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for toggleActive operation"
      }
    }
  },
  "ChangePasswordRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for changePassword operation"
      }
    },
    "example": {
      "data": "Sample request data for changePassword"
    }
  },
  "ChangePasswordResponse": {
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
        "example": "ChangePassword successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for changePassword operation"
      }
    }
  },
  "DeleteAdminUserRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteAdminUser operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteAdminUser"
    }
  },
  "DeleteAdminUserResponse": {
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
        "example": "DeleteAdminUser successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteAdminUser operation"
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
