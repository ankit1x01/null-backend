/**
 * Event-notifications Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/event-notifications/getNotifications": {
    "get": {
      "summary": "GetNotifications operation",
      "description": "Performs getNotifications operation in event-notifications module",
      "tags": [
        "Event-notifications"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetNotifications successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetNotificationsResponse"
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
  "/api/event-notifications/getNotificationById/:id": {
    "get": {
      "summary": "GetNotificationById operation",
      "description": "Performs getNotificationById operation in event-notifications module",
      "tags": [
        "Event-notifications"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetNotificationById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetNotificationByIdResponse"
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
  "/api/event-notifications/getByEvent/:eventId": {
    "get": {
      "summary": "GetNotificationsByEvent operation",
      "description": "Performs getNotificationsByEvent operation in event-notifications module",
      "tags": [
        "Event-notifications"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetNotificationsByEvent successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetNotificationsByEventResponse"
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
  "/api/event-notifications/createNotification": {
    "post": {
      "summary": "CreateNotification operation",
      "description": "Performs createNotification operation in event-notifications module",
      "tags": [
        "Event-notifications"
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
              "$ref": "#/components/schemas/CreateNotificationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateNotification successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateNotificationResponse"
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
  "/api/event-notifications/scheduleForEvent/:eventId": {
    "post": {
      "summary": "ScheduleEventNotifications operation",
      "description": "Performs scheduleEventNotifications operation in event-notifications module",
      "tags": [
        "Event-notifications"
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
              "$ref": "#/components/schemas/ScheduleEventNotificationsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ScheduleEventNotifications successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ScheduleEventNotificationsResponse"
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
  "/api/event-notifications/updateNotification/:id": {
    "put": {
      "summary": "UpdateNotification operation",
      "description": "Performs updateNotification operation in event-notifications module",
      "tags": [
        "Event-notifications"
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
              "$ref": "#/components/schemas/UpdateNotificationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateNotification successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateNotificationResponse"
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
  "/api/event-notifications/sendNotification/:id": {
    "post": {
      "summary": "SendNotification operation",
      "description": "Performs sendNotification operation in event-notifications module",
      "tags": [
        "Event-notifications"
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
              "$ref": "#/components/schemas/SendNotificationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "SendNotification successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SendNotificationResponse"
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
  "/api/event-notifications/processPending": {
    "post": {
      "summary": "ProcessPendingNotifications operation",
      "description": "Performs processPendingNotifications operation in event-notifications module",
      "tags": [
        "Event-notifications"
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
              "$ref": "#/components/schemas/ProcessPendingNotificationsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ProcessPendingNotifications successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProcessPendingNotificationsResponse"
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
  "/api/event-notifications/cancelForEvent/:eventId": {
    "post": {
      "summary": "CancelEventNotifications operation",
      "description": "Performs cancelEventNotifications operation in event-notifications module",
      "tags": [
        "Event-notifications"
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
              "$ref": "#/components/schemas/CancelEventNotificationsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CancelEventNotifications successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CancelEventNotificationsResponse"
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
  "/api/event-notifications/deleteNotification/:id": {
    "delete": {
      "summary": "DeleteNotification operation",
      "description": "Performs deleteNotification operation in event-notifications module",
      "tags": [
        "Event-notifications"
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
              "$ref": "#/components/schemas/DeleteNotificationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteNotification successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteNotificationResponse"
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
