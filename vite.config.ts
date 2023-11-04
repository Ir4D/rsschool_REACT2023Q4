import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rsschool_REACT2023Q4/',
  plugins: [react()]
});
