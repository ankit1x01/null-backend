/**
 * EventTypes Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/event-types/createEventType": {
    "post": {
      "summary": "CreateEventType operation",
      "description": "Performs createEventType operation in event-types module",
      "tags": [
        "EventTypes"
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
              "$ref": "#/components/schemas/CreateEventTypeRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateEventType successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateEventTypeResponse"
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
  "/api/event-types/getEventTypes": {
    "get": {
      "summary": "GetEventTypes operation",
      "description": "Performs getEventTypes operation in event-types module",
      "tags": [
        "EventTypes"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventTypes successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventTypesResponse"
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
  "/api/event-types/getEventTypeById": {
    "get": {
      "summary": "GetEventTypeById operation",
      "description": "Performs getEventTypeById operation in event-types module",
      "tags": [
        "EventTypes"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventTypeById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventTypeByIdResponse"
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
  "/api/event-types/updateEventType": {
    "put": {
      "summary": "UpdateEventType operation",
      "description": "Performs updateEventType operation in event-types module",
      "tags": [
        "EventTypes"
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
              "$ref": "#/components/schemas/UpdateEventTypeRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateEventType successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateEventTypeResponse"
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
  "/api/event-types/deleteEventType": {
    "delete": {
      "summary": "DeleteEventType operation",
      "description": "Performs deleteEventType operation in event-types module",
      "tags": [
        "EventTypes"
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
              "$ref": "#/components/schemas/DeleteEventTypeRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteEventType successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteEventTypeResponse"
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
