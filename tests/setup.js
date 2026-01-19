/**
 * Jest Test Setup
 * Global configuration for all tests
 */

// Set test environment variables
process.env.SKIP_ENCRYPTION = 'true';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-12345';
process.env.JWT_EXPIRES_IN = '1h';
process.env.PORT = '3002';

// Increase timeout for integration tests
jest.setTimeout(30000);

// Suppress console logs during tests (optional)
if (process.env.SUPPRESS_LOGS === 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };
}
