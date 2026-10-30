import emailjs from '@emailjs/browser'
import { reportError } from '@/lib/logger'

/**
 * Lógica do formulário de contato, FORA do componente: validação, limite de envio e chamada ao EmailJS.
 * Motivo: regra de negócio em função pura é testável sem renderizar nada, e o componente fica só com UI.
 *
 * Decisão: EmailJS mantém o site 100% estático (sem backend para manter, atualizar ou pagar). O custo é
 * que a chave pública vai no bundle — por design do serviço. Por isso a proteção é em CAMADAS, não
 * absoluta: honeypot + limite no cliente (abaixo) + lista de domínios permitidos e cota mensal no painel
 * do EmailJS. O limite no cliente é só UX (qualquer um limpa o localStorage); controle de abuso de
 * verdade precisa ficar no servidor. Se o volume ou o risco crescer: função serverless (Vercel) com
 * captcha e rate limit no servidor, na frente do provedor de e-mail.
 */

export interface ContactValues { name: string; email: string; subject: string; message: string }
export type ContactField = 'name' | 'email' | 'message'
export type FieldErrors = Partial<Record<ContactField, 'nameRequired' | 'emailRequired' | 'emailInvalid' | 'messageRequired'>>

/** Tipos de falha de envio. Cada um vira uma mensagem diferente — "deu erro" genérico não ajuda ninguém. */
export type SendFailure = 'rate_limited' | 'network' | 'service' | 'misconfigured'

export class ContactSendError extends Error {
  constructor(readonly kind: SendFailure, options?: { cause?: unknown }) {
    super(`contact send failed: ${kind}`, options)
    this.name = 'ContactSendError'
  }
}

const RATE_LIMIT_KEY = 'contact_last_submit'
export const RATE_LIMIT_MS = 60 * 60 * 1000 // 1 hora
export const SEND_TIMEOUT_MS = 15_000

// Regex propositalmente simples: serve para pegar erro de digitação (falta "@" ou domínio). Validar
// e-mail "de verdade" é impossível só com regex; quem confirma é a resposta ao e-mail.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(v: ContactValues): FieldErrors {
  const errors: FieldErrors = {}
  if (!v.name.trim()) errors.name = 'nameRequired'
  if (!v.email.trim()) errors.email = 'emailRequired'
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'emailInvalid'
  if (!v.message.trim()) errors.message = 'messageRequired'
  return errors
}

/** Só guarda QUANDO o formulário foi enviado por último neste navegador — nenhum dado pessoal. */
export function isRateLimited(now: number = Date.now()): boolean {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw) as { timestamp?: number } | number
    const ts = typeof parsed === 'number' ? parsed : parsed.timestamp
    return typeof ts === 'number' && now - ts < RATE_LIMIT_MS
  } catch {
    // localStorage bloqueado (modo privado) ou JSON corrompido: na dúvida, NÃO bloqueia o visitante.
    return false
  }
}

export function markSubmitted(now: number = Date.now()): void {
  try { localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamp: now })) } catch { /* storage indisponível */ }
}

/** Rejeita se a promessa não resolver a tempo. Sem isso, rede travada deixaria o botão em "Enviando..." para sempre. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new ContactSendError('network', { cause: 'timeout' })), ms)
    promise.then(
      value => { clearTimeout(timer); resolve(value) },
      error => { clearTimeout(timer); reject(error) },
    )
  })
}

/** O EmailJS rejeita com `{ status, text }`. status 0/ausente = nem chegou ao servidor (rede). */
function classify(error: unknown): SendFailure {
  if (error instanceof ContactSendError) return error.kind
  const status = (error as { status?: number } | null)?.status
  if (typeof status !== 'number' || status === 0) return 'network'
  if (status === 429) return 'rate_limited'
  return 'service'
}

/**
 * Envia a mensagem. Lança sempre `ContactSendError` (um tipo só para o chamador tratar).
 * As variáveis de ambiente são lidas AQUI, na hora do envio, e não no topo do módulo: assim uma
 * configuração ausente vira erro tratável ("misconfigured") em vez de um `undefined` indo para a API,
 * e os testes conseguem trocar o ambiente com `vi.stubEnv`.
 */
export async function sendContact(values: ContactValues): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined
  if (!serviceId || !templateId || !publicKey) {
    reportError(new Error('EmailJS env vars missing'), 'contactForm')
    throw new ContactSendError('misconfigured')
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new ContactSendError('network')

  try {
    await withTimeout(
      emailjs.send(serviceId, templateId, { ...values }, { publicKey }),
      SEND_TIMEOUT_MS,
    )
  } catch (error) {
    const kind = classify(error)
    // Nunca logamos `values` (nome, e-mail, mensagem): são dados pessoais, possivelmente sensíveis.
    reportError(error, `contactForm:${kind}`)
    throw error instanceof ContactSendError ? error : new ContactSendError(kind, { cause: error })
  }
}
