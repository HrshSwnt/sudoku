import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Check environment variable for base URL
const base = process.env.VITE_TARGET === 'gh-pages' ? '/sudoku/' : './';

export default defineConfig({
  base,
  plugins: [react()],
});
