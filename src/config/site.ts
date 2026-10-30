/**
 * Fonte única da verdade da identidade pública do site.
 * SITE_URL vem da configuração já existente no projeto (index.html / robots.txt / sitemap.xml
 * já usavam https://elaineteixeira.com). NÃO foi confirmada pela cliente — ver docs/seo-strategy.md.
 * Sobrescreva por ambiente com VITE_SITE_URL (o script de SEO pós-build lê a mesma variável).
 */
export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://elaineteixeira.com').replace(/\/$/, '')
export const PLAUSIBLE_DOMAIN = 'elaineteixeira.com'
export const CONTACT_EMAIL = 'elaine.teixeira.psy@gmail.com'
export const WHATSAPP_NUMBER = '4915232713148'
/** Mesmo perfil usado no JSON-LD (index.html). Antes Contact e Footer apontavam para URLs diferentes. */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/elaine-teixeira-20a90459/'
