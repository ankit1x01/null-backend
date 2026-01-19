/**
 * Venues Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = {
  "GetVenuesRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getVenues operation"
      }
    },
    "example": {
      "data": "Sample request data for getVenues"
    }
  },
  "GetVenuesResponse": {
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
        "example": "GetVenues successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getVenues operation"
      }
    }
  },
  "GetVenueByIdRequest": {
    "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "description": "Request data for getVenueById operation"
      }
    },
    "example": {
      "data": "Sample request data for getVenueById"
    }
  },
  "GetVenueByIdResponse": {
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
        "example": "GetVenueById successful"
      },
      "result": {
        "type": "object",
        "description": "Result data for getVenueById operation"
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
