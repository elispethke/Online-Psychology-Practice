import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useScrolledPast } from '@/hooks/useScrolledPast'

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  act(() => { window.dispatchEvent(new Event('scroll')) })
}

describe('useScrolledPast', () => {
  it('muda para true ao passar do limiar e volta para false', () => {
    scrollTo(0)
    const { result } = renderHook(() => useScrolledPast(100))
    expect(result.current).toBe(false)
    scrollTo(150)
    expect(result.current).toBe(true)
    scrollTo(50)
    expect(result.current).toBe(false)
  })

  it('usa um único listener para vários componentes e o remove ao desmontar', () => {
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    const a = renderHook(() => useScrolledPast(10))
    const b = renderHook(() => useScrolledPast(20))
    expect(add.mock.calls.filter(([type]) => type === 'scroll')).toHaveLength(1)
    a.unmount()
    expect(remove.mock.calls.filter(([type]) => type === 'scroll')).toHaveLength(0)
    b.unmount()
    expect(remove.mock.calls.filter(([type]) => type === 'scroll')).toHaveLength(1)
    vi.restoreAllMocks()
  })
})
