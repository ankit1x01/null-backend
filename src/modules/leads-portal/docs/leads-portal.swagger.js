/**
 * Leads-portal Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/leads-portal/chapters": {
    "get": {
      "summary": "GetMyChapters operation",
      "description": "Performs getMyChapters operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetMyChapters successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetMyChaptersResponse"
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
  "/api/leads-portal/events": {
    "get": {
      "summary": "GetMyEvents operation",
      "description": "Performs getMyEvents operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetMyEvents successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetMyEventsResponse"
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
  "/api/leads-portal/stats": {
    "get": {
      "summary": "GetMyStats operation",
      "description": "Performs getMyStats operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetMyStats successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetMyStatsResponse"
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
  "/api/leads-portal/attention": {
    "get": {
      "summary": "GetEventsNeedingAttention operation",
      "description": "Performs getEventsNeedingAttention operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventsNeedingAttention successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventsNeedingAttentionResponse"
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
  "/api/leads-portal/chapters/:chapterId/events": {
    "post": {
      "summary": "CreateEvent operation",
      "description": "Performs createEvent operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
  "/api/leads-portal/events/:eventId": {
    "put": {
      "summary": "UpdateEvent operation",
      "description": "Performs updateEvent operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
  "/api/leads-portal/events/:eventId/registrations": {
    "get": {
      "summary": "GetEventRegistrations operation",
      "description": "Performs getEventRegistrations operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
  "/api/leads-portal/events/:eventId/sessions": {
    "get": {
      "summary": "GetEventSessions operation",
      "description": "Performs getEventSessions operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventSessions successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventSessionsResponse"
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
    },
    "post": {
      "summary": "CreateEventSession operation",
      "description": "Performs createEventSession operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
              "$ref": "#/components/schemas/CreateEventSessionRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateEventSession successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateEventSessionResponse"
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
  "/api/leads-portal/events/:eventId/export": {
    "get": {
      "summary": "ExportRegistrations operation",
      "description": "Performs exportRegistrations operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "ExportRegistrations successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExportRegistrationsResponse"
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
  "/api/leads-portal/events/:eventId/registrations/mass-update": {
    "put": {
      "summary": "MassUpdateRegistrations operation",
      "description": "Performs massUpdateRegistrations operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
              "$ref": "#/components/schemas/MassUpdateRegistrationsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "MassUpdateRegistrations successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MassUpdateRegistrationsResponse"
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
  "/api/leads-portal/events/:eventId/sessions/:sessionId": {
    "put": {
      "summary": "UpdateEventSession operation",
      "description": "Performs updateEventSession operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
              "$ref": "#/components/schemas/UpdateEventSessionRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateEventSession successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateEventSessionResponse"
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
  "/api/leads-portal/events/:eventId/sessions/suggest-user": {
    "get": {
      "summary": "SuggestUser operation",
      "description": "Performs suggestUser operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "SuggestUser successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SuggestUserResponse"
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
  "/api/leads-portal/events/:eventId/mailer-tasks": {
    "get": {
      "summary": "GetEventMailerTasks operation",
      "description": "Performs getEventMailerTasks operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventMailerTasks successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventMailerTasksResponse"
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
    },
    "post": {
      "summary": "CreateEventMailerTask operation",
      "description": "Performs createEventMailerTask operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
              "$ref": "#/components/schemas/CreateEventMailerTaskRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateEventMailerTask successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateEventMailerTaskResponse"
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
  "/api/leads-portal/events/:eventId/mailer-tasks/:taskId": {
    "get": {
      "summary": "GetEventMailerTaskById operation",
      "description": "Performs getEventMailerTaskById operation in leads-portal module",
      "tags": [
        "Leads-portal"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventMailerTaskById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventMailerTaskByIdResponse"
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
    },
    "put": {
      "summary": "UpdateEventMailerTask operation",
      "description": "Performs updateEventMailerTask operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
              "$ref": "#/components/schemas/UpdateEventMailerTaskRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateEventMailerTask successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateEventMailerTaskResponse"
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
    },
    "delete": {
      "summary": "DeleteEventMailerTask operation",
      "description": "Performs deleteEventMailerTask operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
              "$ref": "#/components/schemas/DeleteEventMailerTaskRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteEventMailerTask successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteEventMailerTaskResponse"
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
  "/api/leads-portal/events/:eventId/mailer-tasks/:taskId/execute": {
    "post": {
      "summary": "ExecuteEventMailerTask operation",
      "description": "Performs executeEventMailerTask operation in leads-portal module",
      "tags": [
        "Leads-portal"
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
              "$ref": "#/components/schemas/ExecuteEventMailerTaskRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ExecuteEventMailerTask successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExecuteEventMailerTaskResponse"
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
