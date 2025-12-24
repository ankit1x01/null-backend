/**
 * Venues Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/venues/create": {
    "post": {
      "summary": "CreateVenue operation",
      "description": "Performs createVenue operation in venues module",
      "tags": [
        "Venues"
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
              "$ref": "#/components/schemas/CreateVenueRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateVenue successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateVenueResponse"
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
  "/api/venues/": {
    "get": {
      "summary": "GetVenues operation",
      "description": "Performs getVenues operation in venues module",
      "tags": [
        "Venues"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetVenues successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetVenuesResponse"
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
  "/api/venues/:id": {
    "get": {
      "summary": "GetVenueById operation",
      "description": "Performs getVenueById operation in venues module",
      "tags": [
        "Venues"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetVenueById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetVenueByIdResponse"
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
  "/api/venues/update/:id": {
    "put": {
      "summary": "UpdateVenue operation",
      "description": "Performs updateVenue operation in venues module",
      "tags": [
        "Venues"
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
              "$ref": "#/components/schemas/UpdateVenueRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateVenue successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateVenueResponse"
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
  "/api/venues/delete/:id": {
    "delete": {
      "summary": "DeleteVenue operation",
      "description": "Performs deleteVenue operation in venues module",
      "tags": [
        "Venues"
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
              "$ref": "#/components/schemas/DeleteVenueRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteVenue successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteVenueResponse"
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
