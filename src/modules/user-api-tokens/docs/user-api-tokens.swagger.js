/**
 * User-api-tokens Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/user-api-tokens/": {
    "get": {
      "summary": "GetMyTokens operation",
      "description": "Performs getMyTokens operation in user-api-tokens module",
      "tags": [
        "User-api-tokens"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetMyTokens successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetMyTokensResponse"
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
    },
    "post": {
      "summary": "CreateToken operation",
      "description": "Performs createToken operation in user-api-tokens module",
      "tags": [
        "User-api-tokens"
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
              "$ref": "#/components/schemas/CreateTokenRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateToken successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTokenResponse"
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
  "/api/user-api-tokens/:id": {
    "put": {
      "summary": "UpdateToken operation",
      "description": "Performs updateToken operation in user-api-tokens module",
      "tags": [
        "User-api-tokens"
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
              "$ref": "#/components/schemas/UpdateTokenRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateToken successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTokenResponse"
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
    },
    "delete": {
      "summary": "RevokeToken operation",
      "description": "Performs revokeToken operation in user-api-tokens module",
      "tags": [
        "User-api-tokens"
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
              "$ref": "#/components/schemas/RevokeTokenRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "RevokeToken successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RevokeTokenResponse"
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
  "/api/user-api-tokens/:id/regenerate": {
    "post": {
      "summary": "RegenerateToken operation",
      "description": "Performs regenerateToken operation in user-api-tokens module",
      "tags": [
        "User-api-tokens"
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
              "$ref": "#/components/schemas/RegenerateTokenRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "RegenerateToken successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegenerateTokenResponse"
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
