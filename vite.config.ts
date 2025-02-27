import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, 'src/components/shared'),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles'),
      },
    ],
  },
});
