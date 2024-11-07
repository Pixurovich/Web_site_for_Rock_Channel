import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://RockReplay.ru',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },
});