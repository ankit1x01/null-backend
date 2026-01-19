/**
 * User-auth-profiles Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/user-auth-profiles/me": {
    "get": {
      "summary": "GetMyProfiles operation",
      "description": "Performs getMyProfiles operation in user-auth-profiles module",
      "tags": [
        "User-auth-profiles"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetMyProfiles successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetMyProfilesResponse"
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
  "/api/user-auth-profiles/link": {
    "post": {
      "summary": "LinkProvider operation",
      "description": "Performs linkProvider operation in user-auth-profiles module",
      "tags": [
        "User-auth-profiles"
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
              "$ref": "#/components/schemas/LinkProviderRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "LinkProvider successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LinkProviderResponse"
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
  "/api/user-auth-profiles/unlink/:provider": {
    "delete": {
      "summary": "UnlinkProvider operation",
      "description": "Performs unlinkProvider operation in user-auth-profiles module",
      "tags": [
        "User-auth-profiles"
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
              "$ref": "#/components/schemas/UnlinkProviderRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UnlinkProvider successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UnlinkProviderResponse"
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
