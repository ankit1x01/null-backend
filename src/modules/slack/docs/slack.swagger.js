/**
 * Slack Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/slack/slackbot/events": {
    "post": {
      "summary": "SlackbotEvents operation",
      "description": "Performs slackbotEvents operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/SlackbotEventsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "SlackbotEvents successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SlackbotEventsResponse"
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
  "/api/slack/": {
    "get": {
      "summary": "GetIntegrations operation",
      "description": "Performs getIntegrations operation in slack module",
      "tags": [
        "Slack"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetIntegrations successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetIntegrationsResponse"
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
      "summary": "CreateIntegration operation",
      "description": "Performs createIntegration operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/CreateIntegrationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateIntegration successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateIntegrationResponse"
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
  "/api/slack/:id": {
    "get": {
      "summary": "GetIntegrationById operation",
      "description": "Performs getIntegrationById operation in slack module",
      "tags": [
        "Slack"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetIntegrationById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetIntegrationByIdResponse"
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
      "summary": "UpdateIntegration operation",
      "description": "Performs updateIntegration operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/UpdateIntegrationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateIntegration successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateIntegrationResponse"
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
      "summary": "DeleteIntegration operation",
      "description": "Performs deleteIntegration operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/DeleteIntegrationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteIntegration successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteIntegrationResponse"
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
  "/api/slack/chapter/:chapterId": {
    "get": {
      "summary": "GetIntegrationByChapter operation",
      "description": "Performs getIntegrationByChapter operation in slack module",
      "tags": [
        "Slack"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetIntegrationByChapter successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetIntegrationByChapterResponse"
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
  "/api/slack/:id/logs": {
    "get": {
      "summary": "GetNotificationLogs operation",
      "description": "Performs getNotificationLogs operation in slack module",
      "tags": [
        "Slack"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetNotificationLogs successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetNotificationLogsResponse"
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
  "/api/slack/:id/toggle": {
    "post": {
      "summary": "ToggleActive operation",
      "description": "Performs toggleActive operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/ToggleActiveRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ToggleActive successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ToggleActiveResponse"
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
  "/api/slack/:id/test": {
    "post": {
      "summary": "TestWebhook operation",
      "description": "Performs testWebhook operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/TestWebhookRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "TestWebhook successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TestWebhookResponse"
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
  "/api/slack/notify/event/:eventId": {
    "post": {
      "summary": "NotifyNewEvent operation",
      "description": "Performs notifyNewEvent operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/NotifyNewEventRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "NotifyNewEvent successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NotifyNewEventResponse"
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
  "/api/slack/notify/event/:eventId/update": {
    "post": {
      "summary": "NotifyEventUpdate operation",
      "description": "Performs notifyEventUpdate operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/NotifyEventUpdateRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "NotifyEventUpdate successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NotifyEventUpdateResponse"
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
  "/api/slack/notify/session/:sessionId": {
    "post": {
      "summary": "NotifyNewSession operation",
      "description": "Performs notifyNewSession operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/NotifyNewSessionRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "NotifyNewSession successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NotifyNewSessionResponse"
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
  "/api/slack/:id/send": {
    "post": {
      "summary": "SendCustomNotification operation",
      "description": "Performs sendCustomNotification operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/SendCustomNotificationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "SendCustomNotification successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SendCustomNotificationResponse"
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
  "/api/slack/logs/:logId/retry": {
    "post": {
      "summary": "RetryNotification operation",
      "description": "Performs retryNotification operation in slack module",
      "tags": [
        "Slack"
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
              "$ref": "#/components/schemas/RetryNotificationRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "RetryNotification successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RetryNotificationResponse"
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
