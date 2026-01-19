/**
 * Twitter Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/twitter/integrations": {
    "get": {
      "summary": "GetIntegrations operation",
      "description": "Performs getIntegrations operation in twitter module",
      "tags": [
        "Twitter"
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
      "description": "Performs createIntegration operation in twitter module",
      "tags": [
        "Twitter"
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
  "/api/twitter/integrations/:id": {
    "get": {
      "summary": "GetIntegrationById operation",
      "description": "Performs getIntegrationById operation in twitter module",
      "tags": [
        "Twitter"
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
      "description": "Performs updateIntegration operation in twitter module",
      "tags": [
        "Twitter"
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
      "description": "Performs deleteIntegration operation in twitter module",
      "tags": [
        "Twitter"
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
  "/api/twitter/tweet/event/:eventId": {
    "post": {
      "summary": "TweetEvent operation",
      "description": "Performs tweetEvent operation in twitter module",
      "tags": [
        "Twitter"
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
              "$ref": "#/components/schemas/TweetEventRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "TweetEvent successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TweetEventResponse"
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
  "/api/twitter/tweet/retry/:tweetLogId": {
    "post": {
      "summary": "RetryTweet operation",
      "description": "Performs retryTweet operation in twitter module",
      "tags": [
        "Twitter"
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
              "$ref": "#/components/schemas/RetryTweetRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "RetryTweet successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RetryTweetResponse"
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
  "/api/twitter/history": {
    "get": {
      "summary": "GetTweetHistory operation",
      "description": "Performs getTweetHistory operation in twitter module",
      "tags": [
        "Twitter"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetTweetHistory successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetTweetHistoryResponse"
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
