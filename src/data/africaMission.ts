/**
 * Photographs for the "Mission in Africa" gallery (src/components/sections/AfricaGallery.tsx).
 *
 * ⚠ PLACEHOLDERS — the client has not sent the mission photographs yet.
 *   Every entry below has `src: null`, which renders a clearly labelled placeholder tile.
 *
 * To replace a placeholder with the real photograph:
 *   1. Put the file in src/assets/img/mission/ (webp, long edge ≤ 1600px).
 *   2. Import it here and set `src` (and fix `width`/`height` to the file's real size).
 *   3. Write a real `alt` text in both languages. Keep `ratio` = width / height.
 * Add or remove entries freely — the gallery measures itself, nothing else needs to change.
 */
export interface MissionPhoto {
  id: string
  /** Imported image URL, or null while the photograph is still a placeholder. */
  src: string | null
  width: number
  height: number
  /** width / height — drives the tile width so the photograph is never cropped */
  ratio: number
  alt: { pt: string; en: string }
  /** Optional caption shown under the photograph */
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

// Mixed proportions on purpose: portrait, landscape and near-square give the rail its rhythm.
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
