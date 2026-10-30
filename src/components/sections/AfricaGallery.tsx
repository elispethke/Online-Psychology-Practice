import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { animate, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { useLang } from '@/hooks/useLang'
import { EASE } from '@/lib/motionVariants'
import { MISSION_PHOTOS, type MissionPhoto } from '@/data/africaMission'

/** Deriva contínua em px/segundo — lenta o bastante para ver as fotos. */
const SPEED = 30
/** Por quanto tempo a deriva fica pausada depois que a pessoa mexeu na galeria pela última vez. */
const RESUME_DELAY_MS = 2800
/** O trilho renderiza o conjunto três vezes para a rolagem ser contínua nos dois sentidos. */
const COPIES = 3
/** Deslocamentos verticais (rem) alternados entre os blocos — quebram a linha reta de um carrossel. */
const OFFSETS = [0, 3.5, 1.25, 5]
const TILE_H = 'clamp(250px, 50svh, 500px)'

const PLACEHOLDER_TONES = [
  'linear-gradient(160deg, var(--sage), var(--forest))',
  'linear-gradient(200deg, var(--teal), var(--forest))',
  'linear-gradient(140deg, var(--gold), var(--sage))',
  'linear-gradient(180deg, var(--sand), var(--teal))',
]

function Tile({ photo, index, lang }: { photo: MissionPhoto; index: number; lang: 'pt' | 'en' }) {
  const { t } = useTranslation()

  return (
    <li
      className="group shrink-0 self-start"
      style={{ width: `calc(${TILE_H} * ${photo.ratio})`, marginTop: `${OFFSETS[index % OFFSETS.length]}rem` }}
    >
      <figure className="m-0">
        <div className="relative overflow-hidden bg-[var(--forest)]" style={{ height: TILE_H }}>
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.alt[lang]}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div
              data-placeholder="true"
              role="img"
              aria-label={photo.alt[lang]}
              className="flex h-full w-full flex-col justify-between p-5 text-[var(--surface)]"
              style={{
                background: PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length],
                outline: import.meta.env.DEV ? '2px dashed var(--gold)' : undefined,
                outlineOffset: '-10px',
              }}
            >
              <span aria-hidden="true" />
              <span className="text-[0.66rem] font-medium uppercase tracking-[0.22em] opacity-85">
                {import.meta.env.DEV ? `${t('africa.placeholder')} · ${photo.id}` : t('africa.soon')}
              </span>
            </div>
          )}
        </div>
        {photo.caption && (
          <figcaption className="mt-3 text-[0.78rem] tracking-[0.04em] text-[var(--on-dark-soft)]">{photo.caption[lang]}</figcaption>
        )}
      </figure>
    </li>
  )
}

export function AfricaGallery() {
  const { t } = useTranslation()
  const lang = useLang()
  const reduced = useReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const firstSetRef = useRef<HTMLUListElement>(null)
  const [userPaused, setUserPaused] = useState(false)

  // Estado mutável de interação lido pelo loop de animação (sem re-render a cada frame)
  const state = useRef({ hover: false, focus: false, drag: false, animating: false, visible: false, holdUntil: 0 })
  const userPausedRef = useRef(userPaused)
  userPausedRef.current = userPaused

  const hold = () => { state.current.holdUntil = performance.now() + RESUME_DELAY_MS }

  // Só roda a deriva enquanto a seção está na tela
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { state.current.visible = e.isIntersecting }, { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Decisão: um loop de requestAnimationFrame que escreve `scrollLeft`, em vez de um "marquee" em CSS.
  // O trilho precisa continuar sendo um scroll container DE VERDADE (deslizar no toque, teclado, trackpad,
  // arrastar com o mouse) e, ao mesmo tempo, andar sozinho. O estado que o loop lê fica em um ref (sem
  // re-render a cada frame). O loop pausa: fora da tela, em hover/foco/arraste, para quem pede movimento
  // reduzido e por um botão explícito de pausa (WCAG 2.2.2 — conteúdo em movimento precisa ser pausável).
  // Loop infinito sem "pulo" = três cópias da lista, com a posição sempre mantida na cópia do meio.
  // Seamless auto-drift: [A][A][A] — position is kept inside the middle copy.
  useEffect(() => {
    const rail = railRef.current
    const set = firstSetRef.current
    if (!rail || !set) return

    let raf = 0
    let last = performance.now()
    let pos = 0
    let applied = 0
    let ready = false

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      const w = set.offsetWidth

      if (w > 0) {
        if (!ready) { rail.scrollLeft = w; pos = applied = rail.scrollLeft; ready = true }

        const s = state.current
        const paused =
          reduced || userPausedRef.current || s.hover || s.focus || s.drag || s.animating || !s.visible || now < s.holdUntil

        // A pessoa (ou uma animação) moveu o trilho: seguir o movimento em vez de brigar com ele
        if (Math.abs(rail.scrollLeft - applied) > 1.5) pos = rail.scrollLeft
        if (!paused) pos += SPEED * dt
        else pos = rail.scrollLeft

        // Recentraliza na cópia do meio — mas nunca enquanto uma animação de botão ou um arraste
        // estiver escrevendo o scrollLeft, senão os dois brigam e o trilho pisca.
        if (!s.animating && !s.drag) {
          if (pos >= 2 * w) pos -= w
          else if (pos < w) pos += w
        }

        if (!paused || Math.abs(pos - rail.scrollLeft) > 0.5) {
          rail.scrollLeft = pos
          applied = rail.scrollLeft
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const scrollByPage = (dir: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const from = rail.scrollLeft
    const distance = dir * rail.clientWidth * 0.7
    state.current.animating = true
    animate(0, distance, {
      duration: reduced ? 0.01 : 0.9,
      ease: EASE,
      onUpdate: v => { rail.scrollLeft = from + v },
      onComplete: () => { state.current.animating = false; hold() },
    })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByPage(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByPage(-1) }
  }

  // Arrastar com o mouse para rolar (toque e trackpad já rolam nativamente)
  const drag = useRef({ x: 0, left: 0 })
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !railRef.current) return
    state.current.drag = true
    drag.current = { x: e.clientX, left: railRef.current.scrollLeft }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!state.current.drag || !railRef.current) return
    railRef.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }
  const endDrag = () => { if (state.current.drag) { state.current.drag = false; hold() } }

  const sets = Array.from({ length: COPIES }, (_, i) => i)

  return (
    <section
      ref={sectionRef}
      id="africa"
      aria-labelledby="africa-title"
      className="overflow-hidden bg-[var(--forest)] text-[var(--on-dark)]"
      style={{ padding: 'var(--section-y) 0' }}
    >
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal><p className="eyebrow mb-6 !text-[var(--gold)]">{t('africa.label')}</p></Reveal>
            <Reveal delay={0.08}>
              <h2 id="africa-title" className="font-display font-light leading-[0.98]" style={{ fontSize: 'clamp(3rem, 7.4vw, 6rem)' }}>
                {t('africa.title')}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[32rem] text-[1rem] leading-[1.8] text-[var(--on-dark-soft)]">{t('africa.subtitle')}</p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-3">
              <p className="mr-4 hidden text-[0.72rem] tracking-[0.12em] text-[var(--on-dark-soft)] xl:block">{t('africa.hint')}</p>
              <button type="button" onClick={() => scrollByPage(-1)} aria-label={t('africa.prev')} className="gallery-btn">
                <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => scrollByPage(1)} aria-label={t('africa.next')} className="gallery-btn">
                <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setUserPaused(v => !v)}
                  aria-pressed={userPaused}
                  aria-label={userPaused ? t('africa.play') : t('africa.pause')}
                  className="gallery-btn"
                >
                  {userPaused
                    ? <Play size={16} strokeWidth={1.5} aria-hidden="true" />
                    : <Pause size={16} strokeWidth={1.5} aria-hidden="true" />}
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed rail */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.4, ease: EASE }}
        className="mt-14 lg:mt-20"
        style={{ maskImage: 'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)' }}
      >
        <div
          ref={railRef}
          role="region"
          aria-label={t('africa.galleryLabel')}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={e => { if (e.pointerType === 'mouse') state.current.hover = true }}
          onPointerLeave={e => { if (e.pointerType === 'mouse') { state.current.hover = false; hold() } }}
          onFocus={() => { state.current.focus = true }}
          onBlur={() => { state.current.focus = false; hold() }}
          onWheel={hold}
          onTouchStart={hold}
          onTouchMove={hold}
          onTouchEnd={hold}
          className="gallery-rail flex cursor-grab overflow-x-auto overscroll-x-contain pb-2 active:cursor-grabbing"
        >
          {sets.map(copy => (
            <ul
              key={copy}
              ref={copy === 0 ? firstSetRef : undefined}
              aria-hidden={copy > 0 ? true : undefined}
              {...(copy > 0 ? ({ inert: '' } as object) : {})}
              className="m-0 flex shrink-0 list-none gap-5 p-0 pr-5 sm:gap-8 sm:pr-8"
            >
              {MISSION_PHOTOS.map((photo, i) => (
                <Tile key={photo.id} photo={photo} index={i} lang={lang} />
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
