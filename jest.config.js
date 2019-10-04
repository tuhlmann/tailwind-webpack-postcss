module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(test).[jt]s?(x)",
    "**/?(*.)+(spec).[jt]s?(x)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "@srv/(.*)": "<rootDir>/src/server/app/$1",
    "@migration/(.*)": "<rootDir>/src/server/migration/$1",
    "@client/(.*)": "<rootDir>/src/client/$1",
    "@common/(.*)": "<rootDir>/src/common/$1"
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
      tsConfig: "<rootDir>/tsconfig.tests.json"
    }
  }
}
