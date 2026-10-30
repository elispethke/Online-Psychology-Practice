import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import emailjs from '@emailjs/browser'
import {
  ContactSendError, isRateLimited, markSubmitted, RATE_LIMIT_MS, SEND_TIMEOUT_MS, sendContact, validateContact,
  type ContactValues,
} from '@/lib/contactForm'

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }))
vi.mock('@/lib/logger', () => ({ reportError: vi.fn() }))

const send = vi.mocked(emailjs.send)
const valid: ContactValues = { name: 'Ana', email: 'ana@example.com', subject: 'individual', message: 'Olá' }

describe('validateContact', () => {
  it('aceita dados válidos', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('exige nome, e-mail e mensagem (espaços em branco não contam)', () => {
    expect(validateContact({ name: '  ', email: '', subject: '', message: '\n' })).toEqual({
      name: 'nameRequired', email: 'emailRequired', message: 'messageRequired',
    })
  })

  it.each(['sem-arroba', 'a@b', 'a@b.', '@x.com', 'a b@c.com'])('rejeita e-mail malformado: %s', email => {
    expect(validateContact({ ...valid, email }).email).toBe('emailInvalid')
  })

  it('assunto é opcional', () => {
    expect(validateContact({ ...valid, subject: '' })).toEqual({})
  })
})

describe('rate limit', () => {
  beforeEach(() => localStorage.clear())

  it('não limita quem nunca enviou', () => {
    expect(isRateLimited()).toBe(false)
  })

  it('limita dentro de 1 hora e libera depois', () => {
    markSubmitted(1_000)
    expect(isRateLimited(1_000 + RATE_LIMIT_MS - 1)).toBe(true)
    expect(isRateLimited(1_000 + RATE_LIMIT_MS)).toBe(false)
  })

  it('aceita o formato antigo (número puro no localStorage)', () => {
    localStorage.setItem('contact_last_submit', String(Date.now()))
    expect(isRateLimited()).toBe(true)
  })

  it('valor corrompido não bloqueia o visitante', () => {
    localStorage.setItem('contact_last_submit', '{quebrado')
    expect(isRateLimited()).toBe(false)
  })
})

describe('sendContact', () => {
  beforeEach(() => {
    send.mockReset()
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_x')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_x')
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'key_x')
  })
  afterEach(() => vi.useRealTimers())

  it('envia com as credenciais do ambiente', async () => {
    send.mockResolvedValue({ status: 200, text: 'OK' })
    await sendContact(valid)
    expect(send).toHaveBeenCalledWith('service_x', 'template_x', valid, { publicKey: 'key_x' })
  })

  it('sem variáveis de ambiente: erro "misconfigured" e NENHUMA chamada de rede', async () => {
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', '')
    await expect(sendContact(valid)).rejects.toMatchObject({ kind: 'misconfigured' })
    expect(send).not.toHaveBeenCalled()
  })

  it('offline: erro "network" sem tentar enviar', async () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    await expect(sendContact(valid)).rejects.toMatchObject({ kind: 'network' })
    expect(send).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it.each([
    [{ status: 0, text: '' }, 'network'],
    [undefined, 'network'],
    [{ status: 429, text: 'Too many' }, 'rate_limited'],
    [{ status: 400, text: 'Bad' }, 'service'],
    [{ status: 500, text: 'Oops' }, 'service'],
  ])('classifica a falha %j como "%s"', async (failure, kind) => {
    send.mockRejectedValue(failure)
    const error = await sendContact(valid).catch(e => e)
    expect(error).toBeInstanceOf(ContactSendError)
    expect(error.kind).toBe(kind)
  })

  it('estoura o tempo limite quando a rede trava (botão não fica preso em "Enviando...")', async () => {
    vi.useFakeTimers()
    send.mockReturnValue(new Promise(() => {})) // nunca resolve
    const assertion = expect(sendContact(valid)).rejects.toMatchObject({ kind: 'network' })
    await vi.advanceTimersByTimeAsync(SEND_TIMEOUT_MS)
    await assertion
  })
})
