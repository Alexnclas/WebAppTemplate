import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_URL,
    build: {
      outDir: 'build',
    },
    plugins: [react(), 
        tailwindcss(),
    ],
  };
});
