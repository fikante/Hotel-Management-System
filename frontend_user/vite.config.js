import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",   // Allow external access
    port: 8080,   // Set the development server port
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(), // Only enable in dev mode
  ].filter(Boolean), // Remove falsy values
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Set alias for imports
    },
  },
}));