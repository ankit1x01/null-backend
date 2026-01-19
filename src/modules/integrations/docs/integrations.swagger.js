/**
 * Integrations Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/integrations/slackbot/events": {
    "post": {
      "summary": "HandleSlackEvents operation",
      "description": "Performs handleSlackEvents operation in integrations module",
      "tags": [
        "Integrations"
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
              "$ref": "#/components/schemas/HandleSlackEventsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "HandleSlackEvents successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/HandleSlackEventsResponse"
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
