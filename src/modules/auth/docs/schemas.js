/**
 * Auth Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "LoginRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for login operation"
      }
    },
    "example": {
      "data": "Sample request data for login"
    }
  },
  "LoginResponse": {
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
        "example": "Login successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for login operation"
      }
    }
  },
  "RegisterRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for register operation"
      }
    },
    "example": {
      "data": "Sample request data for register"
    }
  },
  "RegisterResponse": {
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
        "example": "Register successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for register operation"
      }
    }
  },
  "ProviderTokenRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for providerToken operation"
      }
    },
    "example": {
      "data": "Sample request data for providerToken"
    }
  },
  "ProviderTokenResponse": {
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
        "example": "ProviderToken successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for providerToken operation"
      }
    }
  },
  "ForgotPasswordRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for forgotPassword operation"
      }
    },
    "example": {
      "data": "Sample request data for forgotPassword"
    }
  },
  "ForgotPasswordResponse": {
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
        "example": "ForgotPassword successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for forgotPassword operation"
      }
    }
  },
  "ResetPasswordRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for resetPassword operation"
      }
    },
    "example": {
      "data": "Sample request data for resetPassword"
    }
  },
  "ResetPasswordResponse": {
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
        "example": "ResetPassword successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for resetPassword operation"
      }
    }
  },
  "ConfirmEmailRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for confirmEmail operation"
      }
    },
    "example": {
      "data": "Sample request data for confirmEmail"
    }
  },
  "ConfirmEmailResponse": {
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
        "example": "ConfirmEmail successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for confirmEmail operation"
      }
    }
  },
  "ResendConfirmationRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for resendConfirmation operation"
      }
    },
    "example": {
      "data": "Sample request data for resendConfirmation"
    }
  },
  "ResendConfirmationResponse": {
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
        "example": "ResendConfirmation successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for resendConfirmation operation"
      }
    }
  },
  "UnlockAccountRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for unlockAccount operation"
      }
    },
    "example": {
      "data": "Sample request data for unlockAccount"
    }
  },
  "UnlockAccountResponse": {
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
        "example": "UnlockAccount successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for unlockAccount operation"
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
