/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(your-esm-package|another-esm-package)/)', // allow transformation of ESM packages if needed
    '/.next/',
  ],
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
