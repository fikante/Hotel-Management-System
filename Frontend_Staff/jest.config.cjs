module.exports = {
  // Test environment (browser-like)
  testEnvironment: 'jest-environment-jsdom',

  // Setup files (e.g., for @testing-library/jest-dom)
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Where Jest looks for modules
  moduleDirectories: ['node_modules', '<rootDir>/src'],

  // File transformations
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Handles JS/JSX/TS/TSX
  },

  // Ignore node_modules (except for exceptions)
  transformIgnorePatterns: [
    '/node_modules/(?!your-lib-to-transform)', // Add libs needing Babel
  ],

  // Mock static assets and CSS modules
  moduleNameMapper: {
    // Fix "@/" alias resolution (matches your Vite config)
    '^@/(.*)$': '<rootDir>/src/$1',

    // Mock styles and assets
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // File extensions Jest recognizes
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],

  // Reset mocks between tests
  clearMocks: true,

  // Coverage reports
  coverageDirectory: 'coverage',
};