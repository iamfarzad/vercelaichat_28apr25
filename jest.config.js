/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // Keep CSS module stub
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    // Standard ts-jest transform for TS/TSX
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        // No explicit jsx setting, rely on tsconfig or defaults
      },
    ],
  },
  // Simple ignore pattern
  transformIgnorePatterns: ['/node_modules/', '/.next/'],
  testMatch: [
    '<rootDir>/**/?(*.)+(spec|test).[jt]s?(x)',
    '!<rootDir>/tests/e2e/**',
    '!<rootDir>/tests/routes/**',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/e2e/',
    '/tests/routes/',
    '/tests/fixtures.ts',
    '/tests/helpers.ts',
    '/tests/pages/',
    '/tests/prompts/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
