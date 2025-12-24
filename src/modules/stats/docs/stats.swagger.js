/**
 * Stats Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/stats/dashboard": {
    "get": {
      "summary": "GetDashboardStats operation",
      "description": "Performs getDashboardStats operation in stats module",
      "tags": [
        "Stats"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetDashboardStats successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetDashboardStatsResponse"
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
