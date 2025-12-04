/**
 * Decrypt Middleware
 * Decrypts incoming request bodies before they reach route handlers
 */

const { decryptPayload, isEncrypted } = require('../utils/crypto');

/**
 * Middleware to decrypt request body
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const decryptMiddleware = (req, res, next) => {
  try {
    // Skip decryption for GET requests or empty bodies
    if (req.method === 'GET' || !req.body || Object.keys(req.body).length === 0) {
      return next();
    }
    
    // Check if the body contains encrypted data
    if (req.body.encrypted && isEncrypted(req.body.encrypted)) {
      try {
        // Decrypt the payload
        const decryptedBody = decryptPayload(req.body.encrypted);
        
        // Replace the request body with the decrypted data
        req.body = decryptedBody;
        
        // Add a flag to indicate this request was encrypted
        req.wasEncrypted = true;
      } catch (error) {
        console.error('Decryption middleware error:', error);
        return res.status(400).json({
          code: 'SEC0001',
          message: 'Invalid encrypted payload'
        });
      }
    }
    
    next();
  } catch (error) {
    console.error('Decrypt middleware error:', error);
    next();
  }
};

module.exports = decryptMiddleware;
