/**
 * Event-registrations Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/event-registrations/createEventRegistration": {
    "post": {
      "summary": "CreateEventRegistration operation",
      "description": "Performs createEventRegistration operation in event-registrations module",
      "tags": [
        "Event-registrations"
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
              "$ref": "#/components/schemas/CreateEventRegistrationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateEventRegistration successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateEventRegistrationResponse"
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
  "/api/event-registrations/getEventRegistrations": {
    "get": {
      "summary": "GetEventRegistrations operation",
      "description": "Performs getEventRegistrations operation in event-registrations module",
      "tags": [
        "Event-registrations"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventRegistrations successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventRegistrationsResponse"
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
  "/api/event-registrations/getEventRegistrationById": {
    "get": {
      "summary": "GetEventRegistrationById operation",
      "description": "Performs getEventRegistrationById operation in event-registrations module",
      "tags": [
        "Event-registrations"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventRegistrationById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventRegistrationByIdResponse"
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
  "/api/event-registrations/updateEventRegistration/:id": {
    "put": {
      "summary": "UpdateEventRegistration operation",
      "description": "Performs updateEventRegistration operation in event-registrations module",
      "tags": [
        "Event-registrations"
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
              "$ref": "#/components/schemas/UpdateEventRegistrationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateEventRegistration successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateEventRegistrationResponse"
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
  "/api/event-registrations/deleteEventRegistration/:id": {
    "delete": {
      "summary": "DeleteEventRegistration operation",
      "description": "Performs deleteEventRegistration operation in event-registrations module",
      "tags": [
        "Event-registrations"
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
              "$ref": "#/components/schemas/DeleteEventRegistrationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteEventRegistration successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteEventRegistrationResponse"
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
