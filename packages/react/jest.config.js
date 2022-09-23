module.exports = {
    roots: ['src'],
    testRegex: '(/.*\\.test)\\.(ts|tsx)$',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: "jsdom"
}