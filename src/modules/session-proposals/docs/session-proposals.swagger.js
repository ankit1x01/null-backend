/**
 * Session-proposals Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/session-proposals/getSessionProposals": {
    "get": {
      "summary": "GetSessionProposals operation",
      "description": "Performs getSessionProposals operation in session-proposals module",
      "tags": [
        "Session-proposals"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetSessionProposals successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetSessionProposalsResponse"
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
  "/api/session-proposals/getSessionProposalById/:id": {
    "get": {
      "summary": "GetSessionProposalById operation",
      "description": "Performs getSessionProposalById operation in session-proposals module",
      "tags": [
        "Session-proposals"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetSessionProposalById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetSessionProposalByIdResponse"
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
