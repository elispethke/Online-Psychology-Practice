/**
 * Single source of truth for the public site identity.
 * SITE_URL comes from the project's existing configuration (index.html / robots.txt / sitemap.xml
 * already used https://elaineteixeira.com). It is NOT confirmed by the client — see docs/seo-strategy.md.
 * Override per environment with VITE_SITE_URL (the post-build SEO script reads the same variable).
 */
export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://elaineteixeira.com').replace(/\/$/, '')
export const PLAUSIBLE_DOMAIN = 'elaineteixeira.com'
export const CONTACT_EMAIL = 'elaine.teixeira.psy@gmail.com'
export const WHATSAPP_NUMBER = '4915232713148'
/** Mesmo perfil usado no JSON-LD (index.html). Antes Contact e Footer apontavam para URLs diferentes. */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/elaine-teixeira-20a90459/'
