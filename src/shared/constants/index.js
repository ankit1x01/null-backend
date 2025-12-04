// Export all shared constants
module.exports = {
  // Application configuration
  appConfig: {
    app: {
      // IPs that are allowed higher rate limits
      rateLimitAllowedIp: [
        '127.0.0.1',  // localhost
        '::1'         // localhost IPv6
      ]
    }
  },
  // Add your shared constants here
  auth: {
    jwt: {
      SECRET_ENV_KEY: process.env.JWT_SECRET,
      DEFAULT_SECRET: 'zx7DDeB/wNMMoGYIQVEAj6tboHd3QUeXFuTSKeXm/YE=',
      EXPIRY: '2h'
    },
  },
  roles: {
    ADMIN: 'ADMIN',
    USER: 'USER',
  },
  serverError: {
    code: 'ERR0000',
    message: 'Internal server error',
    statusCode: 500
  }
};
