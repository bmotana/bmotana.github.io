import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

vi.mock('gsap', () => {
  const timeline = () => ({
    to: vi.fn().mockReturnThis(),
  })

  return {
    default: {
      context: vi.fn((fn) => {
        fn()
        return { revert: vi.fn() }
      }),
      set: vi.fn(),
      to: vi.fn(),
      timeline: vi.fn(timeline),
      registerPlugin: vi.fn(),
    },
  }
})

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
  },
}))
