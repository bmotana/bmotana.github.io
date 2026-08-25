import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

export default function App() {
  const [phase, setPhase] = useState('loading') // loading -> fading -> ready
  const ambientLayerRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorArrowRef = useRef(null)

  useEffect(() => {
    const MIN_LOADING_MS = 1200
    const FADE_MS = 1000
    const MAX_WAIT_MS = 3000
    let minLoadingDone = false
    let windowLoaded = document.readyState === 'complete'
    let fadeTimeoutId = 0
    let readyTimeoutId = 0
    let maxTimeoutId = 0

    const startFadeOut = () => {
      if (!minLoadingDone || !windowLoaded) return

      setPhase('fading')
      readyTimeoutId = window.setTimeout(() => setPhase('ready'), FADE_MS)
    }

    const handleWindowLoad = () => {
      windowLoaded = true
      startFadeOut()
    }

    fadeTimeoutId = window.setTimeout(() => {
      minLoadingDone = true
      startFadeOut()
    }, MIN_LOADING_MS)

    maxTimeoutId = window.setTimeout(() => {
      windowLoaded = true
      minLoadingDone = true
      startFadeOut()
    }, MAX_WAIT_MS)

    if (windowLoaded) {
      startFadeOut()
    } else {
      window.addEventListener('load', handleWindowLoad, { once: true })
    }

    return () => {
      window.removeEventListener('load', handleWindowLoad)
      clearTimeout(fadeTimeoutId)
      clearTimeout(readyTimeoutId)
      clearTimeout(maxTimeoutId)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      lerp: 0.08,
    })

    let frameId = 0
    const raf = (time) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return

      const id = anchor.getAttribute('href')
      if (!id || id === '#') return

      const target = document.querySelector(id)
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target, { offset: -96, duration: 1.3, lock: true })
      window.history.replaceState(null, '', id)
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const layer = ambientLayerRef.current
    if (!layer) return

    let frameId = 0
    let lastTime = 0
    let lastScrollY = window.scrollY
    let boost = 0
    let t = 0

    const animate = (time) => {
      if (!lastTime) lastTime = time
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      const currentScrollY = window.scrollY
      const scrollDelta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      boost = Math.min(2.8, boost + scrollDelta * 0.01)
      boost *= Math.exp(-3 * dt)

      const speed = 0.42 + boost
      t += dt * speed

      const x = Math.sin(t * 0.6) * 44
      const y = Math.cos(t * 0.5) * 38
      const pulse = 1 + Math.sin(t * 1.4) * 0.08
      const rotate = Math.sin(t * 0.25) * 10
      const hue = 8 + Math.sin(t * 0.35) * 6

      layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${pulse}) rotate(${rotate}deg)`
      layer.style.filter = `blur(130px) hue-rotate(${hue}deg)`
      layer.style.opacity = `${0.34 + Math.sin(t * 1.2) * 0.08}`

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const arrow = cursorArrowRef.current
    if (!cursor || !arrow) return

    let frameId = 0
    let clickTimeoutId = 0
    let isInGrowZone = false
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const render = { x: pointer.x, y: pointer.y, size: 28, scale: 1, arrow: 0 }
    const target = { size: 28, scale: 1, arrow: 0 }

    const onPointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY

      const growZone = event.target.closest('[data-cursor-grow="true"]')
      isInGrowZone = Boolean(growZone)
      target.size = isInGrowZone ? 42 : 28
      target.scale = isInGrowZone ? 1.12 : 1
    }

    const onPointerLeave = () => {
      target.size = 28
      target.scale = 1
      target.arrow = 0
    }

    const onPointerDown = (event) => {
      const interactiveTarget = event.target.closest(
        'a, button, [role="button"], input[type="button"], input[type="submit"]',
      )
      if (!interactiveTarget) return

      target.arrow = 1
      target.size = isInGrowZone ? 46 : 34
      target.scale = isInGrowZone ? 1.18 : 1.06

      if (clickTimeoutId) clearTimeout(clickTimeoutId)
      clickTimeoutId = window.setTimeout(() => {
        target.arrow = 0
        target.size = isInGrowZone ? 42 : 28
        target.scale = isInGrowZone ? 1.12 : 1
      }, 260)
    }

    const animate = () => {
      render.x += (pointer.x - render.x) * 0.24
      render.y += (pointer.y - render.y) * 0.24
      render.size += (target.size - render.size) * 0.09
      render.scale += (target.scale - render.scale) * 0.08
      render.arrow += (target.arrow - render.arrow) * 0.18

      cursor.style.transform = `translate3d(${render.x}px, ${render.y}px, 0) translate(-50%, -50%) scale(${render.scale})`
      cursor.style.width = `${render.size}px`
      cursor.style.height = `${render.size}px`
      cursor.style.borderRadius = `${50 - render.arrow * 16}% ${50 + render.arrow * 8}% ${50 - render.arrow * 14}% ${50 + render.arrow * 10}%`
      arrow.style.opacity = `${render.arrow}`
      arrow.style.transform = `translate(-50%, -50%) scale(${0.72 + render.arrow * 0.42}) rotate(${render.arrow * 10}deg)`

      frameId = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerdown', onPointerDown)
    frameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
      if (clickTimeoutId) clearTimeout(clickTimeoutId)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100">
      <style>
        {`
          @keyframes cursor-breathe {
            0% { opacity: 0.84; filter: saturate(1); }
            50% { opacity: 1; filter: saturate(1.2); }
            100% { opacity: 0.84; filter: saturate(1); }
          }
        `}
      </style>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden rounded-full bg-linear-to-br from-zinc-900 via-violet-700 to-fuchsia-400 shadow-[0_0_24px_rgba(154,95,255,0.5)] mix-blend-screen will-change-transform md:block"
        style={{ animation: 'cursor-breathe 2.2s ease-in-out infinite' }}
      >
        <span
          ref={cursorArrowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 text-sm font-semibold text-white opacity-0"
        >
          ↗
        </span>
      </div>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-zinc-950" />
        <div
          ref={ambientLayerRef}
          className="absolute left-1/2 top-1/2 h-[72rem] w-[72rem] max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-fuchsia-500/28 via-indigo-500/25 to-sky-400/24 will-change-transform"
        />
      </div>
      {phase !== 'ready' && <LoadingScreen isFadingOut={phase === 'fading'} />}

      <div
        className={[
          'relative z-10 transition-opacity duration-500 ease-out motion-reduce:transition-none',
          phase === 'loading' ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        <Navbar />
        <main>
          <Hero isIntroReady={phase === 'ready'} />
          <About />
          <Services />
          <Projects />
        </main>
        <Footer />
      </div>
    </div>
  )
}
