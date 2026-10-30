import { useTranslation } from 'react-i18next'

/**
 * Idioma da interface principal: 'pt' ou 'en'. O alemão existe só nas páginas legais, então qualquer
 * outro valor vira 'pt'. Antes `i18n.language === 'en' ? 'en' : 'pt'` estava copiado em 4 componentes;
 * centralizar evita que uma cópia seja corrigida e as outras não.
 */
export function useLang(): 'pt' | 'en' {
  const { i18n } = useTranslation()
  return i18n.language === 'en' ? 'en' : 'pt'
}
