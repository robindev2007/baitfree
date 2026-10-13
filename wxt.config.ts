import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  outDir: 'dist',
  manifest: {
    name: 'BaitFree - Hide Feeds & Clickbait',
    description: 'Browse intentionally. Free your screen from feeds, comments, clickbait, and recommendations.',
    permissions: ['storage', 'webNavigation', 'alarms', 'tabs'],
    host_permissions: [
      '*://*.youtube.com/*',
      '*://*.facebook.com/*',
      '*://*.fb.com/*',
      '*://*.twitter.com/*',
      '*://*.x.com/*',
      '*://*.reddit.com/*',
      '*://*.netflix.com/*',
      '*://*.linkedin.com/*',
      '*://*.instagram.com/*',
      '*://*.pinterest.com/*',
    ],
  },
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
        cn: path.resolve(__dirname, './lib/utils.ts'),
      },
    },
  }),
});
