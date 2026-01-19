/**
 * Event-types Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/event-types/getEventTypes": {
    "get": {
      "summary": "GetEventTypes operation",
      "description": "Performs getEventTypes operation in event-types module",
      "tags": [
        "Event-types"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventTypes successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventTypesResponse"
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
  "/api/event-types/getEventTypeById": {
    "get": {
      "summary": "GetEventTypeById operation",
      "description": "Performs getEventTypeById operation in event-types module",
      "tags": [
        "Event-types"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventTypeById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventTypeByIdResponse"
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
