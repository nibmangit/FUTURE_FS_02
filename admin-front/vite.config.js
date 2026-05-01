import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ],
  build: {
    // Vite 8 specific fix: This forces the build to use 
    // standard resolution if the native one fails.
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      },
    },
  },
  // If the error persists, adding this can help bypass 
  // strict package resolution errors in Vite 8
  resolve: {
    mainFields: ['module', 'main', 'jsnext:main', 'browser'],
  }
})
