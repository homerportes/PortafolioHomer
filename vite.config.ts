import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import path from 'path'

/**
 * The public address of the site, used for canonical/Open Graph URLs, the
 * sitemap and robots.txt. Set SITE_URL (e.g. https://homerportes.dev); on
 * Vercel the production domain is picked up automatically.
 */
function siteUrl() {
  const explicit = process.env.SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, '')
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  return vercel ? `https://${vercel}` : ''
}

/** Absolute URLs in index.html, plus robots.txt and sitemap.xml at build time. */
function siteMeta(): Plugin {
  const url = siteUrl()
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      // without a known domain, fall back to root-relative URLs
      return html.replaceAll('%SITE_URL%', url)
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(url ? ['', `Sitemap: ${url}/sitemap.xml`] : [])]
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` })
      if (!url) {
        this.warn('SITE_URL is not set: sitemap.xml skipped and share URLs are relative.')
        return
      }
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), siteMeta()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
