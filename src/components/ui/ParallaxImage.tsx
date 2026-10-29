import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  /** CSS object-position for the crop */
  position?: string
  /** Travel of the image inside its frame, as % of the frame height */
  travel?: number
  priority?: boolean
}

/**
 * Photograph that drifts inside a fixed frame while the page scrolls (scroll-linked
 * parallax). The image is oversized by `travel`% so the frame never shows an edge.
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
