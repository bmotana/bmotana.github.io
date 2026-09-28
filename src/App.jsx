import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

export default function App() {
  const [phase, setPhase] = useState('loading') // loading -> fading -> ready
  const ambientLayerRef = useRef(null)

  useEffect(() => {
    const MIN_LOADING_MS = 1200
    const FADE_MS = 500
    const MAX_WAIT_MS = 3000
    let minLoadingDone = false
    let windowLoaded = document.readyState === 'complete'
    let fadeTimeoutId = 0
    let readyTimeoutId = 0
    let maxTimeoutId = 0
    let isFadingStarted = false

    const cleanupTimers = () => {
      clearTimeout(fadeTimeoutId)
      clearTimeout(maxTimeoutId)
    }

    const startFadeOut = () => {
      if (isFadingStarted) return
      if (!minLoadingDone || !windowLoaded) return

      isFadingStarted = true
      cleanupTimers()

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
      if (isFadingStarted) return
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
      cleanupTimers()
      clearTimeout(readyTimeoutId)
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
      const navOffset = window.matchMedia('(min-width: 640px)').matches ? -96 : -140
      lenis.scrollTo(target, { offset: navOffset, duration: 1.3, lock: true })
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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100">
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
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
