/**
 * Encrypt Middleware
 * Encrypts outgoing response bodies before they are sent to the client
 */

const { encryptPayload, isEncrypted } = require('../utils/crypto');
const { shouldSkipEncryption } = require('../utils/skipEncryptionRoutes');

/**
 * Middleware to encrypt response body
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const encryptMiddleware = (req, res, next) => {
  // Check if encryption should be skipped entirely
  if (process.env.SKIP_ENCRYPTION === 'true') {
    // If we have a formatted response, send it without encryption
    if (res.locals.formattedResponse) {
      return res.json(res.locals.formattedResponse);
    }
    return next();
  }

  // Store the original methods
  const originalJson = res.json;
  const originalSend = res.send;
  const originalEnd = res.end;

  // Force encryption flag from environment
  const forceEncryption = process.env.FORCE_ENCRYPTION === 'true';

  // Check if this route should skip encryption
  const shouldSkip = shouldSkipEncryption(req.originalUrl);
  if (shouldSkip) {
    console.log(`Skipping encryption for route: ${req.originalUrl}`);
    return next();
  }
  
  console.log('Encryption middleware activated');
  
  /**
   * Helper to encrypt any JSON response
   */
  const encryptJsonResponse = (body) => {
    if (!body) return body;
    
    // Skip encryption if it's already encrypted
    if (body.encrypted && typeof body.encrypted === 'string') {
      return body;
    }
    
    // Skip encryption for routes in the skip list
    if (shouldSkipEncryption(req.originalUrl)) {
      console.log(`Skipping encryption for response on route: ${req.originalUrl}`);
      return body;
    }
    
    // Encrypt the body
    try {
      const encryptedBody = {
        encrypted: encryptPayload(body)
      };
      return encryptedBody;
    } catch (error) {
      console.error('Failed to encrypt response:', error);
      return body;
    }
  };
  
  // Override the json method
  res.json = function(body) {
    console.log('Intercepted res.json call');
    try {
      // Skip encryption for empty responses
      if (!body) {
        return originalJson.call(this, body);
      }
      
      // Encrypt the response
      const encryptedBody = encryptJsonResponse(body);
      
      // Set content type
      res.setHeader('Content-Type', 'application/json');
      
      // Send the encrypted response
      return originalJson.call(this, encryptedBody);
    } catch (error) {
      console.error('Encryption middleware json error:', error);
      return originalJson.call(this, body);
    }
  };
  
  // Override the send method
  res.send = function(body) {
    console.log('Intercepted res.send call');
    try {
      // Skip encryption for non-JSON or empty responses
      if (!body) {
        return originalSend.call(this, body);
      }
      
      let jsonBody;
      let isJson = false;
      
      // If it's an object (but not a Buffer)
      if (typeof body === 'object' && !(body instanceof Buffer)) {
        jsonBody = body;
        isJson = true;
      }
      // If it's a string that might be JSON
      else if (typeof body === 'string') {
        const trimmed = body.trim();
        if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || 
            (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
          try {
            jsonBody = JSON.parse(trimmed);
            isJson = true;
          } catch (e) {
            // Not valid JSON
            isJson = false;
          }
        }
      }
      
      // Only encrypt JSON responses
      if (isJson) {
        const encryptedBody = encryptJsonResponse(jsonBody);
        res.setHeader('Content-Type', 'application/json');
        return originalSend.call(this, JSON.stringify(encryptedBody));
      }
      
      // For non-JSON responses, send as is
      return originalSend.call(this, body);
    } catch (error) {
      console.error('Encryption middleware send error:', error);
      return originalSend.call(this, body);
    }
  };
  
  // Also override end to catch direct end() calls
  res.end = function(chunk, encoding) {
    if (chunk && typeof chunk === 'string' && res.getHeader('content-type') === 'application/json') {
      try {
        const jsonBody = JSON.parse(chunk);
        const encryptedBody = encryptJsonResponse(jsonBody);
        return originalEnd.call(this, JSON.stringify(encryptedBody), encoding);
      } catch (e) {
        // Not valid JSON or encryption failed
      }
    }
    return originalEnd.call(this, chunk, encoding);
  };
  
  // Check if we have a formatted response from the response middleware
  if (res.locals.formattedResponse) {
    console.log('Found formatted response, encrypting and sending');
    const responseToSend = res.locals.formattedResponse;
    
    // Encrypt the response
    const encryptedResponse = encryptJsonResponse(responseToSend);
    
    // Send the encrypted response
    res.setHeader('Content-Type', 'application/json');
    return originalJson.call(res, encryptedResponse);
  }
  
  // If no formatted response, continue to next middleware
  next();
};

module.exports = encryptMiddleware;
