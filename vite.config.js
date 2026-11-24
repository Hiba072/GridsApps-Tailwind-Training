import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    rolldownOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        products: fileURLToPath(new URL('./product-card.html', import.meta.url)),
        drill: fileURLToPath(new URL('./responsive-drill.html', import.meta.url)),
      },
    },
  },
})
