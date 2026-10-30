import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import '@fontsource/cormorant-garamond/latin-300.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/cormorant-garamond/latin-300-italic.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import '@fontsource/cormorant-garamond/latin-500-italic.css'
import '@fontsource-variable/montserrat/wght.css'
import './i18n/i18n'
import './styles/globals.css'

const container = document.getElementById('root')
// Falha cedo e com mensagem clara, em vez do "Cannot read properties of null" do `!` (non-null assertion).
if (!container) throw new Error('Elemento #root não encontrado em index.html')

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    {/* Boundary de nível superior: protege a home (as páginas legais têm o seu próprio). */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
