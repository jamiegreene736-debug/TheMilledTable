import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ["**/tmp/**", "**/dist/**"],
    },
    // Proxy API calls to Express when running `npm run server` alongside `npm run dev`
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
