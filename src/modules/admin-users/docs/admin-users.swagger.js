/**
 * Admin-users Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/admin-users/login": {
    "post": {
      "summary": "AdminLogin operation",
      "description": "Performs adminLogin operation in admin-users module",
      "tags": [
        "Admin-users"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/AdminLoginRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "AdminLogin successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AdminLoginResponse"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  },
  "/api/admin-users/getAdminUsers": {
    "get": {
      "summary": "GetAdminUsers operation",
      "description": "Performs getAdminUsers operation in admin-users module",
      "tags": [
        "Admin-users"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetAdminUsers successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetAdminUsersResponse"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  },
  "/api/admin-users/getAdminUserById/:id": {
    "get": {
      "summary": "GetAdminUserById operation",
      "description": "Performs getAdminUserById operation in admin-users module",
      "tags": [
        "Admin-users"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetAdminUserById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetAdminUserByIdResponse"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  },
  "/api/admin-users/createAdminUser": {
    "post": {
      "summary": "CreateAdminUser operation",
      "description": "Performs createAdminUser operation in admin-users module",
      "tags": [
        "Admin-users"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateAdminUserRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateAdminUser successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateAdminUserResponse"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  },
  "/api/admin-users/updateAdminUser/:id": {
    "put": {
      "summary": "UpdateAdminUser operation",
      "description": "Performs updateAdminUser operation in admin-users module",
      "tags": [
        "Admin-users"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateAdminUserRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateAdminUser successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateAdminUserResponse"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  },
  "/api/admin-users/toggleActive/:id": {
    "put": {
      "summary": "ToggleActive operation",
      "description": "Performs toggleActive operation in admin-users module",
      "tags": [
        "Admin-users"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ToggleActiveRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ToggleActive successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ToggleActiveResponse"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  },
  "/api/admin-users/changePassword/:id": {
    "put": {
      "summary": "ChangePassword operation",
      "description": "Performs changePassword operation in admin-users module",
      "tags": [
        "Admin-users"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ChangePasswordRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ChangePassword successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ChangePasswordResponse"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  },
  "/api/admin-users/deleteAdminUser/:id": {
    "delete": {
      "summary": "DeleteAdminUser operation",
      "description": "Performs deleteAdminUser operation in admin-users module",
      "tags": [
        "Admin-users"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/DeleteAdminUserRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteAdminUser successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteAdminUserResponse"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    }
  }
};
