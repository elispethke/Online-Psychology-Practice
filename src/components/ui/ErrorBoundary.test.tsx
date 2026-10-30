import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { reportError } from '@/lib/logger'

vi.mock('@/lib/logger', () => ({ reportError: vi.fn() }))

function Boom(): JSX.Element {
  throw new Error('falha de render')
}

describe('ErrorBoundary', () => {
  // React imprime o erro capturado no console; silenciamos para não poluir a saída dos testes.
  beforeEach(() => { vi.spyOn(console, 'error').mockImplementation(() => {}) })
  afterEach(() => vi.restoreAllMocks())

  it('renderiza os filhos quando não há erro', () => {
    render(<ErrorBoundary><p>tudo certo</p></ErrorBoundary>)
    expect(screen.getByText('tudo certo')).toBeInTheDocument()
  })

  it('mostra um fallback com role="alert" (e não uma tela branca) quando um filho lança', () => {
    render(<ErrorBoundary><Boom /></ErrorBoundary>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /recarregar/i })).toBeInTheDocument()
  })

  it('reporta o erro ao logger', () => {
    render(<ErrorBoundary><Boom /></ErrorBoundary>)
    expect(reportError).toHaveBeenCalled()
  })
})
