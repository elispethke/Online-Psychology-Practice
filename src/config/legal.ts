import { CONTACT_EMAIL } from '@/config/site'

/**
 * Legal identification data for the Impressum / privacy policy.
 *
 * ⚠ Only data that already exists in the project is filled in. Every `null` is a MANDATORY or
 * recommended item that the client still has to supply — the legal pages render a visible
 * "pending" marker for it instead of an invented value. Do not fill these with guesses.
 */
export const LEGAL = {
  name: 'Elaine Teixeira',
  email: CONTACT_EMAIL,
  /** Ladungsfähige Anschrift (street, postcode, city) — required by § 5 DDG. */
  address: null as string | null,
  /** Professional title as used on the site (from the existing CV copy). */
  professionalTitle: 'Psicóloga / Psychologin (Brasil) — CRP 06/55288',
  /** Chamber / regulatory body — inferred from the "CRP 06" registration on the site; client must confirm. */
  chamber: null as string | null,
  /** Supervisory authority, if the activity requires authorisation in Germany. */
  supervisoryAuthority: null as string | null,
  /** USt-IdNr. (§ 27a UStG) — only if the client holds one. */
  vatId: null as string | null,
  /** Hosting provider of the production site (needed for the privacy policy). */
  hostingProvider: null as string | null,
  /** Mailbox provider that receives contact-form messages. */
  mailboxProvider: null as string | null,
  /** Competent data-protection authority — Berlin DPA, valid only if the controller is based in Berlin. */
  authority: {
    name: 'Berliner Beauftragte für Datenschutz und Informationsfreiheit',
    address: 'Alt-Moabit 59-61, 10555 Berlin',
    email: 'mailbox@datenschutz-berlin.de',
    web: 'https://www.datenschutz-berlin.de',
  },
  /** Date of the last review of the legal texts (ISO). */
  updated: '2026-10-29',
}
