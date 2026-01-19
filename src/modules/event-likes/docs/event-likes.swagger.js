/**
 * Event-likes Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/event-likes/myLikes": {
    "get": {
      "summary": "GetUserLikes operation",
      "description": "Performs getUserLikes operation in event-likes module",
      "tags": [
        "Event-likes"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetUserLikes successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetUserLikesResponse"
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
  "/api/event-likes/session/:sessionId": {
    "get": {
      "summary": "GetSessionLikes operation",
      "description": "Performs getSessionLikes operation in event-likes module",
      "tags": [
        "Event-likes"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetSessionLikes successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetSessionLikesResponse"
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
      "summary": "AddLike operation",
      "description": "Performs addLike operation in event-likes module",
      "tags": [
        "Event-likes"
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
              "$ref": "#/components/schemas/AddLikeRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "AddLike successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddLikeResponse"
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
      "summary": "RemoveLike operation",
      "description": "Performs removeLike operation in event-likes module",
      "tags": [
        "Event-likes"
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
              "$ref": "#/components/schemas/RemoveLikeRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "RemoveLike successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RemoveLikeResponse"
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
  "/api/event-likes/session/:sessionId/counts": {
    "get": {
      "summary": "GetSessionLikeCounts operation",
      "description": "Performs getSessionLikeCounts operation in event-likes module",
      "tags": [
        "Event-likes"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetSessionLikeCounts successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetSessionLikeCountsResponse"
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
  "/api/event-likes/session/:sessionId/myLike": {
    "get": {
      "summary": "GetUserSessionLike operation",
      "description": "Performs getUserSessionLike operation in event-likes module",
      "tags": [
        "Event-likes"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetUserSessionLike successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetUserSessionLikeResponse"
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
  "/api/event-likes/session/:sessionId/toggle": {
    "post": {
      "summary": "ToggleLike operation",
      "description": "Performs toggleLike operation in event-likes module",
      "tags": [
        "Event-likes"
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
              "$ref": "#/components/schemas/ToggleLikeRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ToggleLike successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ToggleLikeResponse"
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
  "/api/event-likes/event/:eventId/topSessions": {
    "get": {
      "summary": "GetTopLikedSessions operation",
      "description": "Performs getTopLikedSessions operation in event-likes module",
      "tags": [
        "Event-likes"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetTopLikedSessions successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetTopLikedSessionsResponse"
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
  "/api/event-likes/event/:eventId/engagement": {
    "get": {
      "summary": "GetEventEngagement operation",
      "description": "Performs getEventEngagement operation in event-likes module",
      "tags": [
        "Event-likes"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetEventEngagement successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetEventEngagementResponse"
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
  "/api/event-likes/sessions/reactions": {
    "post": {
      "summary": "GetSessionsReactions operation",
      "description": "Performs getSessionsReactions operation in event-likes module",
      "tags": [
        "Event-likes"
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
              "$ref": "#/components/schemas/GetSessionsReactionsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "GetSessionsReactions successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetSessionsReactionsResponse"
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
  "/api/event-likes/sessions/myLikes": {
    "post": {
      "summary": "GetUserLikesForSessions operation",
      "description": "Performs getUserLikesForSessions operation in event-likes module",
      "tags": [
        "Event-likes"
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
              "$ref": "#/components/schemas/GetUserLikesForSessionsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "GetUserLikesForSessions successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetUserLikesForSessionsResponse"
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
