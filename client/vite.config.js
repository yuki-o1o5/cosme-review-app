import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // outDir: "build"
    rollupOptions: {
      external: ["public/hero.jpg"],
    },
  },
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
