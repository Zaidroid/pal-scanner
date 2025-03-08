import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    https: true,
    host: true
  },
  optimizeDeps: {
    include: ['react-webcam']
  }
});
