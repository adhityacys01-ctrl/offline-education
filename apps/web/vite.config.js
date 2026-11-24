import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'icons/*.png'],
            manifest: {
                name: 'Offline Learning Platform',
                short_name: 'LearnOffline',
                description: 'Learn Anytime, Anywhere. Download. Learn. Sync.',
                theme_color: '#4F46E5',
                background_color: '#F8FAFC',
                display: 'standalone',
                orientation: 'portrait',
                icons: [
                    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
                    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } }
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@contracts': path.resolve(__dirname, '../../packages/contracts/src')
        }
    },
    server: {
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': { target: 'http://localhost:3001', changeOrigin: true }
        }
    }
});
