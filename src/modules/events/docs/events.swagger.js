/**
 * Events Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/events/getEvents": {
    "get": {
      "summary": "GetEvents operation",
      "description": "Performs getEvents operation in events module",
      "tags": [
        "Events"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEvents successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventsResponse"
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
  "/api/events/getEventById": {
    "get": {
      "summary": "GetEventById operation",
      "description": "Performs getEventById operation in events module",
      "tags": [
        "Events"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventByIdResponse"
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
  "/api/events/createEvent": {
    "post": {
      "summary": "CreateEvent operation",
      "description": "Performs createEvent operation in events module",
      "tags": [
        "Events"
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
              "$ref": "#/components/schemas/CreateEventRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateEvent successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateEventResponse"
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
  "/api/events/updateEvent/:id": {
    "put": {
      "summary": "UpdateEvent operation",
      "description": "Performs updateEvent operation in events module",
      "tags": [
        "Events"
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
              "$ref": "#/components/schemas/UpdateEventRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateEvent successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateEventResponse"
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
  "/api/events/deleteEvent/:id": {
    "delete": {
      "summary": "DeleteEvent operation",
      "description": "Performs deleteEvent operation in events module",
      "tags": [
        "Events"
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
              "$ref": "#/components/schemas/DeleteEventRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteEvent successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteEventResponse"
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
  "/api/events/:id/calendar.ics": {
    "get": {
      "summary": "GenerateICS operation",
      "description": "Performs generateICS operation in events module",
      "tags": [
        "Events"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GenerateICS successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GenerateICSResponse"
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
