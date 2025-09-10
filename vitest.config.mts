/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // biar bisa langsung pakai describe/it/expect tanpa import
    environment: "node",
    include: ["src/test/**/*.test.ts"], // lokasi test
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
