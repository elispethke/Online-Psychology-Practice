import { Component, type ErrorInfo, type ReactNode } from 'react'
import { reportError } from '@/lib/logger'

interface Props { children: ReactNode }
interface State { failed: boolean }

/**
 * Error Boundary: sem ele, qualquer exceção durante a renderização desmonta a árvore inteira e o
 * visitante vê uma TELA BRANCA. Aqui mostramos uma mensagem com saída (recarregar) e reportamos o erro.
 *
 * Por que é classe: React ainda não tem API de hook para `getDerivedStateFromError`/`componentDidCatch`.
 * Por que o texto é fixo (PT + EN) e não vem do i18n: se o erro for justamente no i18n, o fallback
 * dependeria da coisa que quebrou. Um fallback não pode ter dependências que possam falhar.
 * Limite: boundaries NÃO pegam erros em event handlers nem em código assíncrono — esses são tratados
 * no ponto de uso (ex.: o envio do formulário).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(error, `ErrorBoundary${info.componentStack ? ` ${info.componentStack.split('\n')[1]?.trim() ?? ''}` : ''}`)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--surface)] px-6 text-center text-[var(--forest)]">
        <h1 className="font-display text-3xl font-light">Algo deu errado · Something went wrong</h1>
        <p className="max-w-md text-[0.95rem] text-ink-soft">
          Não foi possível exibir esta página. Tente recarregar. · This page could not be displayed. Please try reloading.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-sm border border-[var(--forest)] px-7 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.16em]"
        >
          Recarregar · Reload
        </button>
      </div>
    )
  }
}
