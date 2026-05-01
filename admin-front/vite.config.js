import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ],
  css: {
    // Force Vite to use esbuild instead of lightningcss 
    // to prevent the "@theme" and "@tailwind" crash
    transformer: 'postcss', 
    minify: 'esbuild',
  },
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
  chunkSizeWarningLimit: 1000,
})
