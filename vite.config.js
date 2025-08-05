// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '', // ✅ important for GitHub Pages to resolve assets correctly
  plugins: [react()],
});
