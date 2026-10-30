import { useEffect } from 'react'
import { useConsent } from '@/lib/consent'
import { PLAUSIBLE_DOMAIN } from '@/config/site'

const SCRIPT_ID = 'plausible-analytics'

/**
 * O Plausible só é requisitado depois que a pessoa aceita "Estatísticas". Antes disso nenhuma requisição
 * sai do navegador para essa ferramenta. Retirar o consentimento remove o script; a pessoa é
 * avisada no diálogo de preferências de que o código já carregado só para no próximo carregamento da página.
 */
// Decisão: carregamento condicionado ao consentimento (opt-in), e não "carrega tudo e depois esconde o banner".
// Na Alemanha isso é obrigação legal (§ 25 TDDDG), mas também é o melhor padrão de engenharia: nenhuma
// requisição a terceiros, e nenhum custo de rede, até a pessoa concordar. O Plausible não usa cookies, mas
// a requisição (e o IP) ainda chega a um terceiro — por isso continua precisando de consentimento.
export function useAnalyticsLoader() {
  const consent = useConsent()
  const allowed = !!consent?.analytics

  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID)
    if (!allowed) { existing?.remove(); return }
    if (existing) return
    const s = document.createElement('script')
    s.id = SCRIPT_ID
    s.defer = true
    s.dataset.domain = PLAUSIBLE_DOMAIN
    s.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(s)
  }, [allowed])
}
