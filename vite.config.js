import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { PRODUCTION_SITE_URL, getIndexablePaths } from './src/data/seo.js'

function seoFilesPlugin() {
  return {
    name: 'portfolio-seo-files',
    closeBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = getIndexablePaths()
        .map((path) => {
          const loc = path === '/' ? `${PRODUCTION_SITE_URL}/` : `${PRODUCTION_SITE_URL}${path}`
          const priority = path === '/' ? '1.0' : '0.8'
          const changefreq = path === '/' ? 'weekly' : 'monthly'
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
        })
        .join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      writeFileSync(resolve('dist/sitemap.xml'), xml)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    seoFilesPlugin(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer'
          }
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/react-helmet-async')) {
            return 'vendor-helmet'
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
        },
      },
    },
    target: 'esnext',
    modulePreload: {
      polyfill: false,
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-icons',
      'react-helmet-async',
    ],
  },
})
