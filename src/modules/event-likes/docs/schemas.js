/**
 * Event-likes Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetUserLikesRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getUserLikes operation"
      }
    },
    "example": {
      "data": "Sample request data for getUserLikes"
    }
  },
  "GetUserLikesResponse": {
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
        "example": "GetUserLikes successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getUserLikes operation"
      }
    }
  },
  "GetSessionLikesRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getSessionLikes operation"
      }
    },
    "example": {
      "data": "Sample request data for getSessionLikes"
    }
  },
  "GetSessionLikesResponse": {
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
        "example": "GetSessionLikes successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getSessionLikes operation"
      }
    }
  },
  "GetSessionLikeCountsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getSessionLikeCounts operation"
      }
    },
    "example": {
      "data": "Sample request data for getSessionLikeCounts"
    }
  },
  "GetSessionLikeCountsResponse": {
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
        "example": "GetSessionLikeCounts successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getSessionLikeCounts operation"
      }
    }
  },
  "GetUserSessionLikeRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getUserSessionLike operation"
      }
    },
    "example": {
      "data": "Sample request data for getUserSessionLike"
    }
  },
  "GetUserSessionLikeResponse": {
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
        "example": "GetUserSessionLike successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getUserSessionLike operation"
      }
    }
  },
  "ToggleLikeRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for toggleLike operation"
      }
    },
    "example": {
      "data": "Sample request data for toggleLike"
    }
  },
  "ToggleLikeResponse": {
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
        "example": "ToggleLike successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for toggleLike operation"
      }
    }
  },
  "AddLikeRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for addLike operation"
      }
    },
    "example": {
      "data": "Sample request data for addLike"
    }
  },
  "AddLikeResponse": {
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
        "example": "AddLike successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for addLike operation"
      }
    }
  },
  "RemoveLikeRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for removeLike operation"
      }
    },
    "example": {
      "data": "Sample request data for removeLike"
    }
  },
  "RemoveLikeResponse": {
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
        "example": "RemoveLike successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for removeLike operation"
      }
    }
  },
  "GetTopLikedSessionsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getTopLikedSessions operation"
      }
    },
    "example": {
      "data": "Sample request data for getTopLikedSessions"
    }
  },
  "GetTopLikedSessionsResponse": {
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
        "example": "GetTopLikedSessions successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getTopLikedSessions operation"
      }
    }
  },
  "GetEventEngagementRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getEventEngagement operation"
      }
    },
    "example": {
      "data": "Sample request data for getEventEngagement"
    }
  },
  "GetEventEngagementResponse": {
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
        "example": "GetEventEngagement successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getEventEngagement operation"
      }
    }
  },
  "GetSessionsReactionsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getSessionsReactions operation"
      }
    },
    "example": {
      "data": "Sample request data for getSessionsReactions"
    }
  },
  "GetSessionsReactionsResponse": {
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
        "example": "GetSessionsReactions successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getSessionsReactions operation"
      }
    }
  },
  "GetUserLikesForSessionsRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getUserLikesForSessions operation"
      }
    },
    "example": {
      "data": "Sample request data for getUserLikesForSessions"
    }
  },
  "GetUserLikesForSessionsResponse": {
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
        "example": "GetUserLikesForSessions successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getUserLikesForSessions operation"
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
