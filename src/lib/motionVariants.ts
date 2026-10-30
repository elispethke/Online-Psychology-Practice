/** Easing da casa: começo rápido, pouso longo e suave. Usado por todos os reveals. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Revela uma vez, um pouco antes do elemento entrar por completo na tela. */
export const VIEWPORT_ONCE = { once: true, margin: '0px 0px -12% 0px' } as const
