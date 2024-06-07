import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['papaparse'], // Ensure papaparse is included in the optimized dependencies
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://4.227.155.222:8090',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
