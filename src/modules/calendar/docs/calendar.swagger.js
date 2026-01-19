/**
 * Calendar Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/calendar/global.ics": {
    "get": {
      "summary": "GetGlobalCalendar operation",
      "description": "Performs getGlobalCalendar operation in calendar module",
      "tags": [
        "Calendar"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetGlobalCalendar successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetGlobalCalendarResponse"
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
  "/api/calendar/chapter/:chapterId.ics": {
    "get": {
      "summary": "GetChapterCalendar operation",
      "description": "Performs getChapterCalendar operation in calendar module",
      "tags": [
        "Calendar"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetChapterCalendar successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetChapterCalendarResponse"
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
  "/api/calendar/chapter/:chapterId/info": {
    "get": {
      "summary": "GetChapterCalendarJson operation",
      "description": "Performs getChapterCalendarJson operation in calendar module",
      "tags": [
        "Calendar"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetChapterCalendarJson successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetChapterCalendarJsonResponse"
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
