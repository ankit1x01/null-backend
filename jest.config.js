module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  verbose: true,
  setupFiles: ['./tests/setup.js'],
  setupFilesAfterEnv: ['./tests/setup-after-env.js'],
  testMatch: [
    '**/tests/**/*.integration.test.js'  // Only run integration tests
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/coverage/',
    '/docs/'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/docs/**',
    '!src/swagger/**'
  ],
  testTimeout: 30000,
  maxWorkers: 1, // Run tests sequentially to avoid port conflicts
  forceExit: true,
  detectOpenHandles: true
};
