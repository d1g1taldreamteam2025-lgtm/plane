// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Cambia esto por el dominio real cuando se despliegue (importante para el sitemap y SEO)
  site: 'https://familykeyautogroup.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
