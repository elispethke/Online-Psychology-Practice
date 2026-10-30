/**
 * Ponto único para reportar erros. Hoje só escreve no console; amanhã basta trocar o corpo por
 * Sentry/Datadog sem mexer em nenhum componente. Dados pessoais (conteúdo do formulário, e-mail) NUNCA
 * devem ser passados em `context` — é uma exigência de LGPD/DSGVO, não só uma boa prática.
 */
export function reportError(error: unknown, context: string): void {
  console.error(`[${context}]`, error)
}
