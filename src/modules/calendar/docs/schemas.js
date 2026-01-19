/**
 * Calendar Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetGlobalCalendarRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getGlobalCalendar operation"
      }
    },
    "example": {
      "data": "Sample request data for getGlobalCalendar"
    }
  },
  "GetGlobalCalendarResponse": {
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
        "example": "GetGlobalCalendar successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getGlobalCalendar operation"
      }
    }
  },
  "GetChapterCalendarRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getChapterCalendar operation"
      }
    },
    "example": {
      "data": "Sample request data for getChapterCalendar"
    }
  },
  "GetChapterCalendarResponse": {
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
        "example": "GetChapterCalendar successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapterCalendar operation"
      }
    }
  },
  "GetChapterCalendarJsonRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getChapterCalendarJson operation"
      }
    },
    "example": {
      "data": "Sample request data for getChapterCalendarJson"
    }
  },
  "GetChapterCalendarJsonResponse": {
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
        "example": "GetChapterCalendarJson successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getChapterCalendarJson operation"
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
