import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero({ isIntroReady = false }) {
  const sectionRef = useRef(null)
  const glassRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const glass = glassRef.current
    const text = textRef.current

    if (!section || !glass || !text) return undefined

    const ctx = gsap.context(() => {
      gsap.set([glass, text], {
        autoAlpha: 0,
        scale: 0.86,
        transformOrigin: 'center center',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!isIntroReady) return undefined

    const section = sectionRef.current
    const glass = glassRef.current
    const text = textRef.current

    if (!section || !glass || !text) return undefined

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set([glass, text], { autoAlpha: 1, scale: 1 })
        return
      }

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(
          glass,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.05,
            clearProps: 'transform',
          },
          0,
        )
        .to(
          text,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.05,
            clearProps: 'transform',
          },
          0,
        )
    }, section)

    return () => ctx.revert()
  }, [isIntroReady])

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-12 text-center sm:py-16">
      <div
        ref={glassRef}
        className="relative mx-auto max-w-5xl rounded-3xl border border-white/15 bg-white/5 px-10 py-16 opacity-0 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-16 sm:py-20"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl bg-linear-to-br from-white/15 via-transparent to-indigo-300/10 opacity-70"
          aria-hidden="true"
        />
        <div ref={textRef} className="opacity-0">
          <p className="mb-6 text-sm font-medium tracking-widest text-indigo-400 uppercase">
            Available for work
          </p>
          <h1 className="mb-8 text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl">
            Hi, I'm{' '}
            <span className="bg-linear-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Ben Motana
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
            I build fast, accessible, and beautifully designed web applications.
            Currently focused on React, Node.js, and developer tooling.
          </p>
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a href="#projects" className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500">
              View my work
            </a>
            <a href="mailto:bmotana1@gmail.com" id="contact" className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
