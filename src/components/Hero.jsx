import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero({ isIntroReady = false }) {
  const sectionRef = useRef(null)
  const glassRef = useRef(null)
  const textRef = useRef(null)
  const hasAnimatedRef = useRef(false)

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
    if (!isIntroReady || hasAnimatedRef.current) return undefined
    hasAnimatedRef.current = true

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
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-8 text-center sm:px-6 sm:py-16">
      <div
        ref={glassRef}
        className="relative mx-auto max-w-5xl rounded-3xl border border-white/15 bg-white/5 px-5 py-9 opacity-0 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-md min-[400px]:px-8 min-[400px]:py-12 sm:px-16 sm:py-20"
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl bg-linear-to-br from-white/15 via-transparent to-indigo-300/10 opacity-70"
          aria-hidden="true"
        />
        <div ref={textRef} className="opacity-0">
          <p className="mb-4 text-xs font-medium tracking-[0.16em] text-indigo-400 uppercase sm:mb-6 sm:text-sm sm:tracking-widest">
            Available for work
          </p>
          <h1 className="mb-5 text-2xl font-bold leading-tight tracking-tight text-zinc-50 min-[430px]:text-4xl sm:mb-8 sm:text-6xl">
            Hi,{' '}
            <span className="whitespace-nowrap">
              I'm{' '}
              <span className="bg-linear-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                Ben Motana
              </span>
            </span>
          </h1>
          <p className="mx-auto mb-7 max-w-2xl text-base leading-7 text-zinc-300 sm:mb-12 sm:text-xl sm:leading-8">
            I work across web development, data science, and cybersecurity —
            building useful software, turning data into insight, and thinking
            carefully about security along the way.
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-5">
            <a href="#projects" className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:px-6">
              View my work
            </a>
            <a href="#contact" className="rounded-lg border border-zinc-600 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-400 hover:text-zinc-50 sm:px-6">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
