const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  testMatch: ["**/*.(test|spec).(js|jsx|ts|tsx)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    // Example alias support: import x from '@/foo'
    "^@/(.*)$": "<rootDir>/app/$1",
  },
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/?(*.)+(test|spec).[jt]s?(x)",
  ],
};

module.exports = createJestConfig(customJestConfig);
