/**
 * ChapterLeads Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/chapter-leads/createChapterLead": {
    "post": {
      "summary": "CreateChapterLead operation",
      "description": "Performs createChapterLead operation in chapter-leads module",
      "tags": [
        "ChapterLeads"
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
              "$ref": "#/components/schemas/CreateChapterLeadRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateChapterLead successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateChapterLeadResponse"
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
  "/api/chapter-leads/getChapterLeads": {
    "get": {
      "summary": "GetChapterLeads operation",
      "description": "Performs getChapterLeads operation in chapter-leads module",
      "tags": [
        "ChapterLeads"
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
        "ChapterLeads"
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
  },
  "/api/chapter-leads/updateChapterLead": {
    "put": {
      "summary": "UpdateChapterLead operation",
      "description": "Performs updateChapterLead operation in chapter-leads module",
      "tags": [
        "ChapterLeads"
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
              "$ref": "#/components/schemas/UpdateChapterLeadRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateChapterLead successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateChapterLeadResponse"
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
  "/api/chapter-leads/deleteChapterLead": {
    "delete": {
      "summary": "DeleteChapterLead operation",
      "description": "Performs deleteChapterLead operation in chapter-leads module",
      "tags": [
        "ChapterLeads"
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
              "$ref": "#/components/schemas/DeleteChapterLeadRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteChapterLead successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteChapterLeadResponse"
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
