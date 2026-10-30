import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  /** object-position do CSS para o recorte */
  position?: string
  /** Deslocamento da imagem dentro do quadro, em % da altura do quadro */
  travel?: number
  priority?: boolean
}

/**
 * Foto que desliza dentro de um quadro fixo enquanto a página rola (parallax ligado ao
 * scroll). A imagem é `travel`% maior que o quadro, para nunca mostrar uma borda.
 */
export function ParallaxImage({
  src, alt, width, height, className = '', position = '50% 50%', travel = 10, priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`])
  const over = travel * 2

  return (
    <div ref={ref} className={['relative overflow-hidden', className].join(' ')}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className="absolute left-0 w-full object-cover"
        style={{ top: `-${travel}%`, height: `${100 + over}%`, y, objectPosition: position }}
      />
    </div>
  )
}
