import { CONTACT_EMAIL } from '@/config/site'

/**
 * Dados de identificação legal para o Impressum / política de privacidade.
 *
 * ⚠ Só estão preenchidos os dados que já existem no projeto. Todo `null` é um item OBRIGATÓRIO ou
 * recomendado que a cliente ainda precisa fornecer — as páginas legais mostram um marcador visível
 * de "pendente" no lugar, em vez de um valor inventado. Não preencha com chutes.
 */
export const LEGAL = {
  name: 'Elaine Teixeira',
  email: CONTACT_EMAIL,
  /** Ladungsfähige Anschrift (rua, CEP, cidade) — exigida pelo § 5 DDG. */
  address: null as string | null,
  /** Título profissional como usado no site (do texto existente do CV). */
  professionalTitle: 'Psicóloga / Psychologin (Brasil) — CRP 06/55288',
  /** Conselho / órgão regulador — deduzido do registro "CRP 06" no site; a cliente precisa confirmar. */
  chamber: null as string | null,
  /** Autoridade de supervisão, se a atividade exigir autorização na Alemanha. */
  supervisoryAuthority: null as string | null,
  /** USt-IdNr. (§ 27a UStG) — somente se a cliente tiver uma. */
  vatId: null as string | null,
  /** Provedor de hospedagem do site em produção (necessário para a política de privacidade). */
  hostingProvider: null as string | null,
  /** Provedor da caixa de e-mail que recebe as mensagens do formulário de contato. */
  mailboxProvider: null as string | null,
  /** Autoridade de proteção de dados competente — a de Berlim, válida só se o responsável tiver sede em Berlim. */
  authority: {
    name: 'Berliner Beauftragte für Datenschutz und Informationsfreiheit',
    address: 'Alt-Moabit 59-61, 10555 Berlin',
    email: 'mailbox@datenschutz-berlin.de',
    web: 'https://www.datenschutz-berlin.de',
  },
  /** Data da última revisão dos textos legais (ISO). */
  updated: '2026-10-29',
}
