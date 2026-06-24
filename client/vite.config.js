import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development the React app runs on Vite's dev server (port 5173).
// Any request to "/api/*" is proxied to the Express backend on port 3000 so
// the frontend can call the API with same-origin relative URLs.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
