import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.js"],
    include: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
    exclude: ["node_modules", ".next", "out", "dist"],
    css: false,
    restoreMocks: true,
    clearMocks: true,
    mockReset: true,
    reporters: "default",
  },
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
});
