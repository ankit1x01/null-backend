/**
 * Chapters Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/chapters/getChapters": {
    "get": {
      "summary": "GetChapters operation",
      "description": "Performs getChapters operation in chapters module",
      "tags": [
        "Chapters"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetChapters successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetChaptersResponse"
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
  "/api/chapters/getChapterById": {
    "get": {
      "summary": "GetChapterById operation",
      "description": "Performs getChapterById operation in chapters module",
      "tags": [
        "Chapters"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetChapterById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetChapterByIdResponse"
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
