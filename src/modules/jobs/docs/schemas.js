/**
 * Jobs Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetJobsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getJobs operation"
      }
    },
    "example": {
      "data": "Sample request data for getJobs"
    }
  },
  "GetJobsResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetJobs successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getJobs operation"
      }
    }
  },
  "GetJobStatsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getJobStats operation"
      }
    },
    "example": {
      "data": "Sample request data for getJobStats"
    }
  },
  "GetJobStatsResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetJobStats successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getJobStats operation"
      }
    }
  },
  "GetJobByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getJobById operation"
      }
    },
    "example": {
      "data": "Sample request data for getJobById"
    }
  },
  "GetJobByIdResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "GetJobById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getJobById operation"
      }
    }
  },
  "CreateJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for createJob operation"
      }
    },
    "example": {
      "data": "Sample request data for createJob"
    }
  },
  "CreateJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "CreateJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for createJob operation"
      }
    }
  },
  "QueueJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for queueJob operation"
      }
    },
    "example": {
      "data": "Sample request data for queueJob"
    }
  },
  "QueueJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "QueueJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for queueJob operation"
      }
    }
  },
  "StartJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for startJob operation"
      }
    },
    "example": {
      "data": "Sample request data for startJob"
    }
  },
  "StartJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "StartJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for startJob operation"
      }
    }
  },
  "PauseJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for pauseJob operation"
      }
    },
    "example": {
      "data": "Sample request data for pauseJob"
    }
  },
  "PauseJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "PauseJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for pauseJob operation"
      }
    }
  },
  "ResumeJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for resumeJob operation"
      }
    },
    "example": {
      "data": "Sample request data for resumeJob"
    }
  },
  "ResumeJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "ResumeJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for resumeJob operation"
      }
    }
  },
  "RetryJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for retryJob operation"
      }
    },
    "example": {
      "data": "Sample request data for retryJob"
    }
  },
  "RetryJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "RetryJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for retryJob operation"
      }
    }
  },
  "CompleteJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for completeJob operation"
      }
    },
    "example": {
      "data": "Sample request data for completeJob"
    }
  },
  "CompleteJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "CompleteJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for completeJob operation"
      }
    }
  },
  "FailJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for failJob operation"
      }
    },
    "example": {
      "data": "Sample request data for failJob"
    }
  },
  "FailJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "FailJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for failJob operation"
      }
    }
  },
  "UpdateProgressRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for updateProgress operation"
      }
    },
    "example": {
      "data": "Sample request data for updateProgress"
    }
  },
  "UpdateProgressResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "UpdateProgress successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for updateProgress operation"
      }
    }
  },
  "CleanOldJobsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for cleanOldJobs operation"
      }
    },
    "example": {
      "data": "Sample request data for cleanOldJobs"
    }
  },
  "CleanOldJobsResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "CleanOldJobs successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for cleanOldJobs operation"
      }
    }
  },
  "DeleteJobRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for deleteJob operation"
      }
    },
    "example": {
      "data": "Sample request data for deleteJob"
    }
  },
  "DeleteJobResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "SUCCESS0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 200
      },
      "message": {
        "type": "string",
        "example": "DeleteJob successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for deleteJob operation"
      }
    }
  },
  "ErrorResponse": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "example": "ERROR0001"
      },
      "statusCode": {
        "type": "integer",
        "example": 400
      },
      "message": {
        "type": "string",
        "example": "Error message"
      }
    }
  }
};
