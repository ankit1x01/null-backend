/**
 * PagePermissions Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/page-permissions/createPagePermission": {
    "post": {
      "summary": "CreatePagePermission operation",
      "description": "Performs createPagePermission operation in page-permissions module",
      "tags": [
        "PagePermissions"
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
              "$ref": "#/components/schemas/CreatePagePermissionRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreatePagePermission successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreatePagePermissionResponse"
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
  "/api/page-permissions/updatePagePermission": {
    "put": {
      "summary": "UpdatePagePermission operation",
      "description": "Performs updatePagePermission operation in page-permissions module",
      "tags": [
        "PagePermissions"
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
              "$ref": "#/components/schemas/UpdatePagePermissionRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdatePagePermission successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdatePagePermissionResponse"
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
  "/api/page-permissions/deletePagePermission": {
    "delete": {
      "summary": "DeletePagePermission operation",
      "description": "Performs deletePagePermission operation in page-permissions module",
      "tags": [
        "PagePermissions"
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
              "$ref": "#/components/schemas/DeletePagePermissionRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeletePagePermission successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeletePagePermissionResponse"
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
