/**
 * Oauth Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/oauth/github": {
    "get": {
      "summary": "GetGitHubAuthUrl operation",
      "description": "Performs getGitHubAuthUrl operation in oauth module",
      "tags": [
        "Oauth"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetGitHubAuthUrl successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetGitHubAuthUrlResponse"
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
  "/api/oauth/google": {
    "get": {
      "summary": "GetGoogleAuthUrl operation",
      "description": "Performs getGoogleAuthUrl operation in oauth module",
      "tags": [
        "Oauth"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetGoogleAuthUrl successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetGoogleAuthUrlResponse"
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
  "/api/oauth/github/callback": {
    "post": {
      "summary": "HandleGitHubCallback operation",
      "description": "Performs handleGitHubCallback operation in oauth module",
      "tags": [
        "Oauth"
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
              "$ref": "#/components/schemas/HandleGitHubCallbackRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "HandleGitHubCallback successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/HandleGitHubCallbackResponse"
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
  "/api/oauth/google/callback": {
    "post": {
      "summary": "HandleGoogleCallback operation",
      "description": "Performs handleGoogleCallback operation in oauth module",
      "tags": [
        "Oauth"
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
              "$ref": "#/components/schemas/HandleGoogleCallbackRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "HandleGoogleCallback successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/HandleGoogleCallbackResponse"
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
