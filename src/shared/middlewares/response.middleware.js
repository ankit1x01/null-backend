/**
 * Response Middleware
 * Standardizes all API responses across the application
 */

/**
 * Response middleware to standardize API responses
 * @param {Object} data - Response data or error
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const responseMiddleware = (data, req, res, next) => {
  // Skip if headers already sent
  if (res.headersSent) {
    return next(data);
  }

  // Format the response
  let formattedResponse;
  
  // Handle errors
  if (data instanceof Error) {
    try {
      // Try to parse error message if it's a JSON string
      const parsedError = JSON.parse(data.message);
      
      // Set status code (default to 400 for client errors)
      const statusCode = parsedError.statusCode || 400;
      res.status(statusCode);
      
      // Format error response
      formattedResponse = {
        code: parsedError.code || 'ERR0001',
        message: parsedError.message || 'An error occurred'
      };
    } catch (e) {
      // If error message is not JSON, use generic error
      console.error('Unhandled error:', data);
      res.status(500);
      formattedResponse = {
        code: 'ERR0000',
        message: process.env.NODE_ENV === 'production' 
          ? 'An unexpected error occurred' 
          : data.message || 'Internal server error'
      };
    }
  }
  // Handle success responses
  else {
    // Set default success status if not already set
    if (res.statusCode < 200 || res.statusCode >= 300) {
      res.status(200);
    }
    
    // If data already has code and message, use it directly
    if (data && data.code && data.message) {
      formattedResponse = {
        code: data.code,
        message: data.message,
        result: data.result || null
      };
    }
    // For other success responses
    else {
      formattedResponse = {
        code: 'SUCCESS',
        message: 'Operation successful',
        result: data
      };
    }
  }
  
  // Store the formatted response for the encryption middleware
  res.locals.formattedResponse = formattedResponse;
  
  // Pass control to the next middleware (encryption)
  next();
};

module.exports = responseMiddleware;
