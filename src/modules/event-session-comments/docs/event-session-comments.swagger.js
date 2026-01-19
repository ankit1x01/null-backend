/**
 * Event-session-comments Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/event-session-comments/getEventSessionComments": {
    "get": {
      "summary": "GetEventSessionComments operation",
      "description": "Performs getEventSessionComments operation in event-session-comments module",
      "tags": [
        "Event-session-comments"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventSessionComments successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventSessionCommentsResponse"
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
  "/api/event-session-comments/getEventSessionCommentById/:id": {
    "get": {
      "summary": "GetEventSessionCommentById operation",
      "description": "Performs getEventSessionCommentById operation in event-session-comments module",
      "tags": [
        "Event-session-comments"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventSessionCommentById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventSessionCommentByIdResponse"
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
