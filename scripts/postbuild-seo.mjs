/**
 * Post-build SEO step. The app is a client-rendered SPA, so crawlers and social scrapers that do not run
 * JavaScript would see the Portuguese home <head> on every URL. This script writes one HTML file per route
 * (dist/en/index.html, dist/privacidade/index.html, ...) with that route's own <title>, description,
 * canonical, hreflang, robots and JSON-LD, and generates sitemap.xml + robots.txt from a single SITE_URL.
 * The body is the same SPA shell; React mounts as usual.
 */
import { build } from 'esbuild'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'

const SITE = (process.env.VITE_SITE_URL ?? 'https://elaineteixeira.com').replace(/\/$/, '')
const abs = p => (p === '/' ? `${SITE}/` : `${SITE}${p}`)
const html = readFileSync('dist/index.html', 'utf8')
const meta = { pt: JSON.parse(readFileSync('src/i18n/pt.json', 'utf8')).meta, en: JSON.parse(readFileSync('src/i18n/en.json', 'utf8')).meta }

// Conteúdo legal e tabela de rotas são TypeScript: o esbuild empacota os dois num módulo temporário.
// Assim o script usa as MESMAS fontes do app (src/legal/content.ts e src/lib/paths.ts) — antes a
// tabela de rotas era copiada aqui e podia divergir sem erro nenhum.
const out = join(tmpdir(), 'seo-sources.mjs')
await build({
  stdin: {
    contents: "export { DOCS } from './src/legal/content.ts'; export { PATHS, OG_LOCALE } from './src/lib/paths.ts'",
    resolveDir: process.cwd(),
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  outfile: out,
  logLevel: 'silent',
})
const { DOCS, PATHS, OG_LOCALE: LOCALE } = await import(pathToFileURL(out).href)
rmSync(out, { force: true })

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function routeMeta(page, lang) {
  if (page === 'home') return { title: meta[lang].title, description: meta[lang].description, robots: 'index, follow, max-image-preview:large', ogAlt: meta[lang].ogAlt }
  const d = DOCS[page][lang]
  return { title: `${d.title.replace(/ \(.*\)$/, '')} · Elaine Teixeira`, description: d.lead, robots: 'noindex, follow', ogAlt: meta.pt.ogAlt }
}

function swap(src, re, replacement, label) {
  if (!re.test(src)) throw new Error(`postbuild-seo: pattern not found in dist/index.html → ${label}`)
  return src.replace(re, () => replacement)
}

function render(page, lang) {
  const m = routeMeta(page, lang)
  const url = abs(PATHS[page][lang])
  let o = html
  o = swap(o, /<html lang="[^"]*"/, `<html lang="${lang}"`, 'html lang')
  o = swap(o, /<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`, 'title')
  for (const [sel, val] of [
    ['name="description"', m.description], ['name="robots"', m.robots], ['name="googlebot"', m.robots],
    ['property="og:title"', m.title], ['property="og:description"', m.description], ['property="og:url"', url],
    ['property="og:locale"', LOCALE[lang]], ['property="og:locale:alternate"', lang === 'en' ? 'pt_BR' : 'en_US'], ['property="og:image:alt"', m.ogAlt],
    ['name="twitter:title"', m.title], ['name="twitter:description"', m.description], ['name="twitter:image:alt"', m.ogAlt],
  ]) {
    const re = new RegExp(`(<meta ${sel} content=")[^"]*(")`)
    if (!re.test(o)) throw new Error(`postbuild-seo: meta ${sel} not found in dist/index.html`)
    o = o.replace(re, (_, a, b) => `${a}${esc(val)}${b}`)
  }
  // links with data-seo are rebuilt per route
  o = o.replace(/<link [^>]*data-seo[^>]*>\n?/g, '')
  const alts = Object.entries(PATHS[page]).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${abs(p)}" data-seo />`)
  if (page === 'home') alts.push(`<link rel="alternate" hreflang="x-default" href="${abs('/')}" data-seo />`)
  o = swap(o, /<meta name="robots"/, `<link rel="canonical" href="${url}" data-seo />\n${alts.join('\n')}\n<meta name="robots"`, 'seo links anchor')
  if (page === 'home') {
    o = o.replace(/("description": ")[^"]*(",\n\s*"url": "https:\/\/elaineteixeira\.com\/",\n\s*"image")/, (_, a, b) => `${a}${meta[lang].description}${b}`)
  } else {
    o = o.replace(/<script type="application\/ld\+json" id="jsonld">[\s\S]*?<\/script>\n*/, '')
  }
  return o
}

// SITE_URL replacement for the hard-coded default inside index.html (JSON-LD, og:image)
const rewriteHost = s => (SITE === 'https://elaineteixeira.com' ? s : s.replaceAll('https://elaineteixeira.com', SITE))

let count = 0
for (const page of Object.keys(PATHS)) {
  for (const lang of Object.keys(PATHS[page])) {
    const file = PATHS[page][lang] === '/' ? 'dist/index.html' : join('dist', PATHS[page][lang], 'index.html')
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, rewriteHost(render(page, lang)))
    count++
  }
}

const today = new Date().toISOString().slice(0, 10)
const entry = (path, alts) => `  <url>\n    <loc>${abs(path)}</loc>\n    <lastmod>${today}</lastmod>\n${alts.map(([l, p]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(p)}"/>`).join('\n')}\n  </url>`
const homeAlts = [['pt', '/'], ['en', '/en'], ['x-default', '/']]
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entry('/', homeAlts)}\n${entry('/en', homeAlts)}\n</urlset>\n`)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`postbuild-seo: ${count} route documents, sitemap.xml (2 indexable URLs), robots.txt — site ${SITE}`)
