/**
 * Chapter-leads Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/chapter-leads/getChapterLeads": {
    "get": {
      "summary": "GetChapterLeads operation",
      "description": "Performs getChapterLeads operation in chapter-leads module",
      "tags": [
        "Chapter-leads"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetChapterLeads successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetChapterLeadsResponse"
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
  "/api/chapter-leads/getChapterLeadById": {
    "get": {
      "summary": "GetChapterLeadById operation",
      "description": "Performs getChapterLeadById operation in chapter-leads module",
      "tags": [
        "Chapter-leads"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetChapterLeadById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetChapterLeadByIdResponse"
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
