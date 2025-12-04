/**
 * Pages Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/pages/createPage": {
    "post": {
      "summary": "CreatePage operation",
      "description": "Performs createPage operation in pages module",
      "tags": [
        "Pages"
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
              "$ref": "#/components/schemas/CreatePageRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreatePage successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreatePageResponse"
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
  "/api/pages/getPages": {
    "get": {
      "summary": "GetPages operation",
      "description": "Performs getPages operation in pages module",
      "tags": [
        "Pages"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetPages successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetPagesResponse"
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
  "/api/pages/getPageById": {
    "get": {
      "summary": "GetPageById operation",
      "description": "Performs getPageById operation in pages module",
      "tags": [
        "Pages"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetPageById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetPageByIdResponse"
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
  "/api/pages/updatePage": {
    "put": {
      "summary": "UpdatePage operation",
      "description": "Performs updatePage operation in pages module",
      "tags": [
        "Pages"
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
              "$ref": "#/components/schemas/UpdatePageRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdatePage successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdatePageResponse"
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
  "/api/pages/deletePage": {
    "delete": {
      "summary": "DeletePage operation",
      "description": "Performs deletePage operation in pages module",
      "tags": [
        "Pages"
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
              "$ref": "#/components/schemas/DeletePageRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeletePage successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeletePageResponse"
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
