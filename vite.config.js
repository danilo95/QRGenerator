import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/QRGenerator/', // 🔁name of the repo
  plugins: [react()],
});
