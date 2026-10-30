import mark from '@/assets/brand/logo-mark.webp'
import name from '@/assets/brand/logo-name.webp'
import ornament from '@/assets/brand/logo-ornament.webp'

interface BrandLogoProps {
  /** Primeira linha do subtítulo, sob o nome (dourada) — segue o idioma ativo */
  subtitleTop: string
  /** Segunda linha do subtítulo (verde) — segue o idioma ativo */
  subtitleBottom: string
  className?: string
}

/**
 * O logo horizontal oficial, montado a partir dos pixels originais da prancha de
 * identidade: emblema + divisória, "Elaine Teixeira" e o ornamento final são a arte
 * original. As duas linhas de subtítulo são o único texto vivo, para poderem seguir o
 * idioma do site — a prancha traz uma única versão (em inglês) do logo.
 *
 * Tudo é posicionado no espaço de coordenadas próprio do logo (510 × 192) e escalado pela
 * propriedade CSS `--u` (px CSS por unidade do logo), então as proporções nunca se distorcem.
 * Defina `--u` no elemento ou num ancestral, ex.: `[--u:0.3229px]` para um logo de 62px de altura.
 */
export function BrandLogo({ subtitleTop, subtitleBottom, className = '' }: BrandLogoProps) {
  const u = (n: number) => `calc(var(--u) * ${n})`

  return (
    <span
      className={['relative block shrink-0', className].join(' ')}
      style={{ width: u(510), height: u(192) }}
    >
      <img src={mark} alt="" aria-hidden="true" draggable={false} className="logo-piece" style={{ left: 0, top: 0, width: u(170), height: u(192) }} />
      <img src={name} alt="" aria-hidden="true" draggable={false} className="logo-piece" style={{ left: u(180), top: u(30), width: u(315), height: u(62) }} />

      <span
        className="absolute flex items-center whitespace-nowrap font-body uppercase text-[var(--gold)]"
        style={{ left: u(184), top: u(100), width: u(305), height: u(23), gap: u(14), fontSize: u(17), fontWeight: 300, letterSpacing: '0.36em' }}
      >
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--gold)]" />
        <span className="-mr-[0.36em]">{subtitleTop}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--gold)]" />
      </span>

      <span
        className="absolute flex items-center justify-center whitespace-nowrap font-body uppercase text-[var(--forest)]"
        style={{ left: u(184), top: u(132), width: u(305), height: u(22), fontSize: u(14), fontWeight: 400, letterSpacing: '0.38em' }}
      >
        <span className="-mr-[0.38em]">{subtitleBottom}</span>
      </span>

      <img src={ornament} alt="" aria-hidden="true" draggable={false} className="logo-piece" style={{ left: u(180), top: u(156), width: u(315), height: u(32) }} />
    </span>
  )
}
