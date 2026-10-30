export interface NavItem {
  key: string
  href: string
}

/** Navegação principal. FAQ, depoimentos e o CV continuam acessíveis como seções, mas não são itens do menu. */
export const NAV_ITEMS: NavItem[] = [
  { key: 'nav.intercultural', href: '#intercultural' },
  { key: 'nav.counselling', href: '#counselling' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.africa', href: '#africa' },
  { key: 'nav.consulting', href: '#consulting' },
  { key: 'nav.prices', href: '#prices' },
  { key: 'nav.contact', href: '#contact' },
]
