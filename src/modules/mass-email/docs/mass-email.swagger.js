/**
 * Mass-email Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/mass-email/templates": {
    "get": {
      "summary": "GetTemplates operation",
      "description": "Performs getTemplates operation in mass-email module",
      "tags": [
        "Mass-email"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetTemplates successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetTemplatesResponse"
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
  "/api/mass-email/campaigns": {
    "get": {
      "summary": "GetCampaigns operation",
      "description": "Performs getCampaigns operation in mass-email module",
      "tags": [
        "Mass-email"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetCampaigns successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetCampaignsResponse"
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
      "summary": "CreateCampaign operation",
      "description": "Performs createCampaign operation in mass-email module",
      "tags": [
        "Mass-email"
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
              "$ref": "#/components/schemas/CreateCampaignRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateCampaign successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCampaignResponse"
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
  "/api/mass-email/campaigns/:id": {
    "get": {
      "summary": "GetCampaignById operation",
      "description": "Performs getCampaignById operation in mass-email module",
      "tags": [
        "Mass-email"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetCampaignById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetCampaignByIdResponse"
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
      "summary": "UpdateCampaign operation",
      "description": "Performs updateCampaign operation in mass-email module",
      "tags": [
        "Mass-email"
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
              "$ref": "#/components/schemas/UpdateCampaignRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateCampaign successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCampaignResponse"
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
      "summary": "DeleteCampaign operation",
      "description": "Performs deleteCampaign operation in mass-email module",
      "tags": [
        "Mass-email"
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
              "$ref": "#/components/schemas/DeleteCampaignRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteCampaign successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteCampaignResponse"
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
  "/api/mass-email/campaigns/:id/stats": {
    "get": {
      "summary": "GetCampaignStats operation",
      "description": "Performs getCampaignStats operation in mass-email module",
      "tags": [
        "Mass-email"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetCampaignStats successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetCampaignStatsResponse"
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
  "/api/mass-email/recipients/event/:eventId": {
    "get": {
      "summary": "GetEventRecipients operation",
      "description": "Performs getEventRecipients operation in mass-email module",
      "tags": [
        "Mass-email"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventRecipients successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventRecipientsResponse"
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
  "/api/mass-email/recipients/chapter/:chapterId": {
    "get": {
      "summary": "GetChapterRecipients operation",
      "description": "Performs getChapterRecipients operation in mass-email module",
      "tags": [
        "Mass-email"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetChapterRecipients successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetChapterRecipientsResponse"
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
  "/api/mass-email/campaigns/:id/recipients": {
    "post": {
      "summary": "AddRecipients operation",
      "description": "Performs addRecipients operation in mass-email module",
      "tags": [
        "Mass-email"
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
              "$ref": "#/components/schemas/AddRecipientsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "AddRecipients successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddRecipientsResponse"
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
  "/api/mass-email/campaigns/:id/recipients/:recipientId": {
    "delete": {
      "summary": "RemoveRecipient operation",
      "description": "Performs removeRecipient operation in mass-email module",
      "tags": [
        "Mass-email"
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
              "$ref": "#/components/schemas/RemoveRecipientRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "RemoveRecipient successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveRecipientResponse"
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
  "/api/mass-email/campaigns/:id/send": {
    "post": {
      "summary": "SendCampaign operation",
      "description": "Performs sendCampaign operation in mass-email module",
      "tags": [
        "Mass-email"
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
              "$ref": "#/components/schemas/SendCampaignRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "SendCampaign successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SendCampaignResponse"
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
  "/api/mass-email/campaigns/:id/schedule": {
    "post": {
      "summary": "ScheduleCampaign operation",
      "description": "Performs scheduleCampaign operation in mass-email module",
      "tags": [
        "Mass-email"
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
              "$ref": "#/components/schemas/ScheduleCampaignRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ScheduleCampaign successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ScheduleCampaignResponse"
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
  "/api/mass-email/campaigns/:id/cancel-schedule": {
    "post": {
      "summary": "CancelScheduledCampaign operation",
      "description": "Performs cancelScheduledCampaign operation in mass-email module",
      "tags": [
        "Mass-email"
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
              "$ref": "#/components/schemas/CancelScheduledCampaignRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CancelScheduledCampaign successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CancelScheduledCampaignResponse"
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
