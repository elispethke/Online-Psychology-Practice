export interface NavItem {
  key: string
  href: string
}

/** Primary navigation. FAQ, testimonials and the CV stay reachable as sections but are not menu items. */
export const NAV_ITEMS: NavItem[] = [
  { key: 'nav.intercultural', href: '#intercultural' },
  { key: 'nav.counselling', href: '#counselling' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.africa', href: '#africa' },
  { key: 'nav.consulting', href: '#consulting' },
  { key: 'nav.prices', href: '#prices' },
  { key: 'nav.contact', href: '#contact' },
]
