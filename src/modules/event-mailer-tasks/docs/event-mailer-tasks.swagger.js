/**
 * Event-mailer-tasks Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/event-mailer-tasks/getMailerTasks": {
    "get": {
      "summary": "GetMailerTasks operation",
      "description": "Performs getMailerTasks operation in event-mailer-tasks module",
      "tags": [
        "Event-mailer-tasks"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetMailerTasks successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetMailerTasksResponse"
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
  "/api/event-mailer-tasks/getMailerTaskById/:id": {
    "get": {
      "summary": "GetMailerTaskById operation",
      "description": "Performs getMailerTaskById operation in event-mailer-tasks module",
      "tags": [
        "Event-mailer-tasks"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetMailerTaskById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetMailerTaskByIdResponse"
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
  "/api/event-mailer-tasks/previewRecipients": {
    "get": {
      "summary": "PreviewRecipients operation",
      "description": "Performs previewRecipients operation in event-mailer-tasks module",
      "tags": [
        "Event-mailer-tasks"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "PreviewRecipients successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PreviewRecipientsResponse"
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
  "/api/event-mailer-tasks/createMailerTask": {
    "post": {
      "summary": "CreateMailerTask operation",
      "description": "Performs createMailerTask operation in event-mailer-tasks module",
      "tags": [
        "Event-mailer-tasks"
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
              "$ref": "#/components/schemas/CreateMailerTaskRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateMailerTask successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateMailerTaskResponse"
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
  "/api/event-mailer-tasks/updateMailerTask/:id": {
    "put": {
      "summary": "UpdateMailerTask operation",
      "description": "Performs updateMailerTask operation in event-mailer-tasks module",
      "tags": [
        "Event-mailer-tasks"
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
              "$ref": "#/components/schemas/UpdateMailerTaskRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateMailerTask successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateMailerTaskResponse"
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
  "/api/event-mailer-tasks/executeMailerTask/:id": {
    "post": {
      "summary": "ExecuteMailerTask operation",
      "description": "Performs executeMailerTask operation in event-mailer-tasks module",
      "tags": [
        "Event-mailer-tasks"
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
              "$ref": "#/components/schemas/ExecuteMailerTaskRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ExecuteMailerTask successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExecuteMailerTaskResponse"
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
  "/api/event-mailer-tasks/deleteMailerTask/:id": {
    "delete": {
      "summary": "DeleteMailerTask operation",
      "description": "Performs deleteMailerTask operation in event-mailer-tasks module",
      "tags": [
        "Event-mailer-tasks"
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
              "$ref": "#/components/schemas/DeleteMailerTaskRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteMailerTask successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteMailerTaskResponse"
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
