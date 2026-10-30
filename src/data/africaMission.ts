/**
 * Fotos da galeria "Missão na África" (src/components/sections/AfricaGallery.tsx).
 *
 * ⚠ PLACEHOLDERS — a cliente ainda não enviou as fotos da missão.
 *   Toda entrada abaixo tem `src: null`, o que renderiza um bloco de reserva claramente identificado.
 *
 * Para trocar um placeholder pela foto real:
 *   1. Coloque o arquivo em src/assets/img/mission/ (webp, lado maior ≤ 1600px).
 *   2. Importe aqui e defina `src` (e ajuste `width`/`height` para o tamanho real do arquivo).
 *   3. Escreva um texto `alt` de verdade nos dois idiomas. Mantenha `ratio` = largura / altura.
 * Adicione ou remova entradas à vontade — a galeria se mede sozinha, nada mais precisa mudar.
 */
export interface MissionPhoto {
  id: string
  /** URL da imagem importada, ou null enquanto a foto ainda for um placeholder. */
  src: string | null
  width: number
  height: number
  /** largura / altura — define a largura do bloco para a foto nunca ser cortada */
  ratio: number
  alt: { pt: string; en: string }
  /** Legenda opcional exibida sob a foto */
  caption?: { pt: string; en: string }
}

const ph = (n: number, ratio: number): MissionPhoto => ({
  id: `mission-${String(n).padStart(2, '0')}`,
  src: null,
  width: Math.round(ratio * 1000),
  height: 1000,
  ratio,
  alt: { pt: 'Fotografia da missão na África (placeholder)', en: 'Photograph of the mission in Africa (placeholder)' },
})

// Proporções misturadas de propósito: retrato, paisagem e quase quadrado dão ritmo ao trilho.
export const MISSION_PHOTOS: MissionPhoto[] = [
  ph(1, 4 / 5),
  ph(2, 3 / 2),
  ph(3, 3 / 4),
  ph(4, 1),
  ph(5, 5 / 4),
  ph(6, 2 / 3),
  ph(7, 3 / 2),
  ph(8, 4 / 5),
]
