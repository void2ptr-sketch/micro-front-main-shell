module.exports = {
    preset: 'jest-preset-angular',
    testMatch: ['**/+(*.)+(spec|test).ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/.angular/'],
    clearMocks: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/main.ts', '!src/bootstrap.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html', 'lcov', 'json-summary'],
};
