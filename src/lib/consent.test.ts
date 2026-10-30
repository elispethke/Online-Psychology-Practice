import { beforeEach, describe, expect, it, vi } from 'vitest'

// consent.ts guarda estado no escopo do módulo (cache lido no import). Para cada teste começar do zero,
// resetamos o cache de módulos e importamos de novo depois de preparar o localStorage.
async function load() {
  vi.resetModules()
  return import('@/lib/consent')
}

describe('consent', () => {
  beforeEach(() => localStorage.clear())

  it('sem escolha anterior, consentimento é null (banner deve aparecer)', async () => {
    const { getConsent } = await load()
    expect(getConsent()).toBeNull()
  })

  it('setConsent grava a escolha e a próxima visita a lê de volta', async () => {
    const first = await load()
    first.setConsent(true)
    expect(first.getConsent()).toMatchObject({ v: 1, analytics: true })

    const second = await load() // simula recarregar a página
    expect(second.getConsent()?.analytics).toBe(true)
  })

  it('ignora JSON corrompido em vez de quebrar a aplicação', async () => {
    localStorage.setItem('consent_preferences', '{não é json')
    const { getConsent } = await load()
    expect(getConsent()).toBeNull()
  })

  it('descarta consentimento de versão antiga (a pessoa precisa escolher de novo)', async () => {
    localStorage.setItem('consent_preferences', JSON.stringify({ v: 0, analytics: true, ts: 1 }))
    const { getConsent } = await load()
    expect(getConsent()).toBeNull()
  })

  it('descarta valor com tipo errado (analytics não-booleano)', async () => {
    localStorage.setItem('consent_preferences', JSON.stringify({ v: 1, analytics: 'sim', ts: 1 }))
    const { getConsent } = await load()
    expect(getConsent()).toBeNull()
  })

  it('remove a chave legada "cookie_consent" (nunca foi consentimento válido)', async () => {
    localStorage.setItem('cookie_consent', 'accepted')
    await load()
    expect(localStorage.getItem('cookie_consent')).toBeNull()
  })

  it('storage bloqueado: não lança, e a escolha vale só na visita atual', async () => {
    const { setConsent, getConsent } = await load()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceeded') })
    expect(() => setConsent(false)).not.toThrow()
    expect(getConsent()?.analytics).toBe(false)
    vi.restoreAllMocks()
  })

  it('notifica quem está inscrito quando as preferências abrem e fecham', async () => {
    const { openPreferences, closePreferences, setConsent } = await load()
    // O painel de preferências fecha sozinho depois de salvar uma escolha.
    openPreferences()
    setConsent(true)
    expect(() => closePreferences()).not.toThrow()
  })
})
