module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webp)$':
      '<rootDir>/__mocks__/fileMock.js',

    /*Handle component imports*/
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/docs/(.*)$': '<rootDir>/docs/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/backgrounds/(.*)$': '<rootDir>/backgrounds/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/img/(.*)$': '<rootDir>/img/$1',
    '^@/store/(.*)$': '<rootDir>/store/$1'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/.github/'
  ],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
