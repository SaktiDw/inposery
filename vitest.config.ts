import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setup.ts"],
    includeSource: ["pages/**/*.{tsx}"],
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./") }],
  },
});
