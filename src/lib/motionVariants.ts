/** Easing da casa: começo rápido, pouso longo e suave. Usado por todos os reveals. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Revela uma vez, assim que o elemento entra na faixa inferior da tela (margem curta: evita telas vazias ao parar de rolar). */
export const VIEWPORT_ONCE = { once: true, margin: '0px 0px -6% 0px' } as const
