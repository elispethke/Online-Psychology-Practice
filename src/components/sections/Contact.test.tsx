import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@/i18n/i18n'
import { Contact } from '@/components/sections/Contact'
import { ContactSendError } from '@/lib/contactForm'
import * as form from '@/lib/contactForm'

// Mockamos só a camada de rede; validação e rate limit rodam de verdade.
vi.mock('@/lib/contactForm', async importOriginal => {
  const actual = await importOriginal<typeof import('@/lib/contactForm')>()
  return { ...actual, sendContact: vi.fn() }
})

const sendContact = vi.mocked(form.sendContact)

async function fill(user: ReturnType<typeof userEvent.setup>, { consent = true } = {}) {
  await user.type(screen.getByLabelText('Nome'), 'Ana')
  await user.type(screen.getByLabelText('E-mail'), 'ana@example.com')
  await user.type(screen.getByLabelText('Mensagem'), 'Olá, gostaria de agendar.')
  if (consent) await user.click(screen.getByRole('checkbox'))
}

describe('<Contact />', () => {
  beforeEach(() => { sendContact.mockReset() })

  it('campos vazios: mostra erros por campo, foca o primeiro inválido e não envia', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toHaveFocus()
    expect(screen.getByLabelText('Nome')).toHaveAttribute('aria-invalid', 'true')
    expect(sendContact).not.toHaveBeenCalled()
  })

  it('e-mail malformado mostra erro específico', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByLabelText('Nome'), 'Ana')
    await user.type(screen.getByLabelText('E-mail'), 'ana@')
    await user.type(screen.getByLabelText('Mensagem'), 'oi')
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    expect(screen.getByText(/não parece válido/i)).toBeInTheDocument()
  })

  it('sem marcar a caixa de privacidade não envia', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user, { consent: false })
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/privacidade/i)
    expect(sendContact).not.toHaveBeenCalled()
  })

  it('sucesso: envia, mostra confirmação, limpa o formulário e ativa o rate limit', async () => {
    sendContact.mockResolvedValue()
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(await screen.findByRole('status')).toHaveTextContent('Obrigada, Ana')
    expect(sendContact).toHaveBeenCalledWith({ name: 'Ana', email: 'ana@example.com', subject: '', message: 'Olá, gostaria de agendar.' })
    expect(screen.getByLabelText('Nome')).toHaveValue('')
    expect(form.isRateLimited()).toBe(true)
  })

  it.each([
    ['network', /sem conexão/i],
    ['service', /não foi possível enviar/i],
    ['misconfigured', /temporariamente indisponível/i],
  ] as const)('falha "%s": mensagem específica em role="alert" e os dados digitados são mantidos', async (kind, message) => {
    sendContact.mockRejectedValue(new ContactSendError(kind))
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(message)
    expect(screen.getByLabelText('Nome')).toHaveValue('Ana') // não perde o que a pessoa escreveu
    expect(screen.getByRole('button', { name: /enviar/i })).toBeEnabled() // pode tentar de novo
  })

  it('já enviou na última hora: bloqueia sem chamar a rede', async () => {
    form.markSubmitted()
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/aguarde 1 hora/i)
    expect(sendContact).not.toHaveBeenCalled()
  })

  it('honeypot preenchido (bot): finge sucesso mas NÃO envia', async () => {
    const user = userEvent.setup()
    const { container } = render(<Contact />)
    // O honeypot é aria-hidden; o bot "digita" nele direto. Usamos fireEvent para não passar pelo clique/foco do user-event.
    fireEvent.change(container.querySelector('input[tabindex="-1"]')!, { target: { value: 'http://spam.example' } })
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(sendContact).not.toHaveBeenCalled()
  })
})
