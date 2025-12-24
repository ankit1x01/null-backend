/**
 * User-achievements Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/user-achievements/:userId": {
    "get": {
      "summary": "GetUserAchievements operation",
      "description": "Performs getUserAchievements operation in user-achievements module",
      "tags": [
        "User-achievements"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetUserAchievements successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetUserAchievementsResponse"
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
