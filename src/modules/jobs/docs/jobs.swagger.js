/**
 * Jobs Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = {
  "/api/jobs/getJobs": {
    "get": {
      "summary": "GetJobs operation",
      "description": "Performs getJobs operation in jobs module",
      "tags": [
        "Jobs"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetJobs successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetJobsResponse"
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
  "/api/jobs/stats": {
    "get": {
      "summary": "GetJobStats operation",
      "description": "Performs getJobStats operation in jobs module",
      "tags": [
        "Jobs"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetJobStats successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetJobStatsResponse"
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
  "/api/jobs/getJobById/:id": {
    "get": {
      "summary": "GetJobById operation",
      "description": "Performs getJobById operation in jobs module",
      "tags": [
        "Jobs"
      ],
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "responses": {
        "200": {
          "description": "GetJobById successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetJobByIdResponse"
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
  "/api/jobs/createJob": {
    "post": {
      "summary": "CreateJob operation",
      "description": "Performs createJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/CreateJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CreateJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateJobResponse"
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
  "/api/jobs/queueJob": {
    "post": {
      "summary": "QueueJob operation",
      "description": "Performs queueJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/QueueJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "QueueJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/QueueJobResponse"
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
  "/api/jobs/start/:id": {
    "post": {
      "summary": "StartJob operation",
      "description": "Performs startJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/StartJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "StartJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/StartJobResponse"
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
  "/api/jobs/pause/:id": {
    "post": {
      "summary": "PauseJob operation",
      "description": "Performs pauseJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/PauseJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "PauseJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PauseJobResponse"
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
  "/api/jobs/resume/:id": {
    "post": {
      "summary": "ResumeJob operation",
      "description": "Performs resumeJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/ResumeJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "ResumeJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ResumeJobResponse"
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
  "/api/jobs/retry/:id": {
    "post": {
      "summary": "RetryJob operation",
      "description": "Performs retryJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/RetryJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "RetryJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RetryJobResponse"
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
  "/api/jobs/complete/:id": {
    "post": {
      "summary": "CompleteJob operation",
      "description": "Performs completeJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/CompleteJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CompleteJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CompleteJobResponse"
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
  "/api/jobs/fail/:id": {
    "post": {
      "summary": "FailJob operation",
      "description": "Performs failJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/FailJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "FailJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FailJobResponse"
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
  "/api/jobs/progress/:id": {
    "put": {
      "summary": "UpdateProgress operation",
      "description": "Performs updateProgress operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/UpdateProgressRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "UpdateProgress successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateProgressResponse"
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
  "/api/jobs/cleanup": {
    "post": {
      "summary": "CleanOldJobs operation",
      "description": "Performs cleanOldJobs operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/CleanOldJobsRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "CleanOldJobs successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CleanOldJobsResponse"
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
  "/api/jobs/deleteJob/:id": {
    "delete": {
      "summary": "DeleteJob operation",
      "description": "Performs deleteJob operation in jobs module",
      "tags": [
        "Jobs"
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
              "$ref": "#/components/schemas/DeleteJobRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "DeleteJob successful",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteJobResponse"
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
