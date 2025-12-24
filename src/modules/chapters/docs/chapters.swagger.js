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
  },
  "/api/chapters/createChapter": {
    "post": {
      "summary": "CreateChapter operation",
      "description": "Performs createChapter operation in chapters module",
      "tags": [
        "Chapters"
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
              "$ref": "#/components/schemas/CreateChapterRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateChapter successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateChapterResponse"
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
  "/api/chapters/updateChapter/:id": {
    "put": {
      "summary": "UpdateChapter operation",
      "description": "Performs updateChapter operation in chapters module",
      "tags": [
        "Chapters"
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
              "$ref": "#/components/schemas/UpdateChapterRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateChapter successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateChapterResponse"
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
  "/api/chapters/deleteChapter/:id": {
    "delete": {
      "summary": "DeleteChapter operation",
      "description": "Performs deleteChapter operation in chapters module",
      "tags": [
        "Chapters"
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
              "$ref": "#/components/schemas/DeleteChapterRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteChapter successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteChapterResponse"
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
