import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import analyze from 'rollup-plugin-analyzer';

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    analyze(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'apple-touch-icon.png',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon.ico',
        'mask-icon.svg',
      ],
      manifest: {
        name: 'Unit Conversion',
        short_name: 'UnitConversion',
        description: 'Converting metric to imperial and getting weight percentages',
        theme_color: '#663399',
        icons: [
          { src: 'android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
          { src: 'android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
        ],
      },
    }),
  ],
});
