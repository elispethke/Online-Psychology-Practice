export interface NavItem {
  key: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'nav.home', href: '#hero' },
  { key: 'nav.intercultural', href: '#intercultural' },
  { key: 'nav.counselling', href: '#counselling' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.consulting', href: '#consulting' },
  { key: 'nav.cv', href: '#mini-cv' },
  { key: 'nav.testimonials', href: '#testimonials' },
  { key: 'nav.prices', href: '#prices' },
  { key: 'nav.contact', href: '#contact' },
]
