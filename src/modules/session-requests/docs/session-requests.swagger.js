/**
 * Session-requests Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/session-requests/getSessionRequests": {
    "get": {
      "summary": "GetSessionRequests operation",
      "description": "Performs getSessionRequests operation in session-requests module",
      "tags": [
        "Session-requests"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetSessionRequests successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetSessionRequestsResponse"
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
  "/api/session-requests/getSessionRequestById/:id": {
    "get": {
      "summary": "GetSessionRequestById operation",
      "description": "Performs getSessionRequestById operation in session-requests module",
      "tags": [
        "Session-requests"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetSessionRequestById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetSessionRequestByIdResponse"
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
  "/api/session-requests/createSessionRequest": {
    "post": {
      "summary": "CreateSessionRequest operation",
      "description": "Performs createSessionRequest operation in session-requests module",
      "tags": [
        "Session-requests"
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
              "$ref": "#/components/schemas/CreateSessionRequestRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateSessionRequest successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateSessionRequestResponse"
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
