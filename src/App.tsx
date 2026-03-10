import { useEffect, useState } from 'react'
import { Home } from './pages/Home'

function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setWidth(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      id="scroll-progress"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={[
        'fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full',
        'bg-rose-deep text-white flex items-center justify-center',
        'shadow-md transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      style={{ backgroundColor: 'var(--rose-deep)' }}
    >
      ↑
    </button>
  )
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Home />
      <BackToTop />
    </>
  )
}
