module.exports = {
    testMatch: ['**/tests/**/*.spec.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)'],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\.ts$": "ts-jest"
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    globals: {
        'ts-jest': {
            babelConfig: true
        }
    }
};
