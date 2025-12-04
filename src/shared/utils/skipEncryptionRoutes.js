/**
 * Skip Encryption Routes
 * List of routes that should skip encryption in the response
 */

// Routes that should skip encryption (exact match)
const exactRoutes = [
  '/api/transactions/export',
  '/api-docs'
];

// Route patterns that should skip encryption (regex match)
const patternRoutes = [
  // Add regex patterns here if needed
  // Example: /\/api\/files\/download\/.*/
  // Swagger UI static assets
  /\/api-docs\/.*/
];

/**
 * Check if a route should skip encryption
 * @param {string} url - The request URL to check
 * @returns {boolean} - True if encryption should be skipped
 */
const shouldSkipEncryption = (url) => {
  // Check exact routes
  if (exactRoutes.includes(url)) {
    return true;
  }
  
  // Check pattern routes
  for (const pattern of patternRoutes) {
    if (pattern instanceof RegExp && pattern.test(url)) {
      return true;
    }
  }
  
  return false;
};

module.exports = {
  shouldSkipEncryption,
  exactRoutes,
  patternRoutes
};
