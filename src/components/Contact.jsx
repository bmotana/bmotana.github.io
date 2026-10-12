import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const email = 'bmotana1@gmail.com'

export default function Contact() {
  const emailButtonRef = useRef(null)

  useEffect(() => {
    const button = emailButtonRef.current
    if (!button || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const moveButton = (event) => {
      const bounds = button.getBoundingClientRect()
      const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.14
      const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.14

      gsap.to(button, {
        x: gsap.utils.clamp(-8, 8, offsetX),
        y: gsap.utils.clamp(-6, 6, offsetY),
        duration: 0.25,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    const resetButton = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)' })
    }

    button.addEventListener('pointermove', moveButton)
    button.addEventListener('pointerleave', resetButton)

    return () => {
      button.removeEventListener('pointermove', moveButton)
      button.removeEventListener('pointerleave', resetButton)
      gsap.killTweensOf(button)
      gsap.set(button, { clearProps: 'transform' })
    }
  }, [])

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 pb-12 pt-6 sm:pb-24 sm:pt-8">
      <div className="relative overflow-hidden rounded-2xl border border-indigo-300/25 bg-zinc-900/75 px-5 py-9 text-center shadow-[0_18px_60px_rgba(49,46,129,0.18)] sm:px-12 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" />
        <p className="relative mb-3 text-sm font-medium tracking-widest text-indigo-300 uppercase">
          Let’s work together
        </p>
        <h2 className="relative text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          Have a project in mind?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl leading-7 text-zinc-300">
          I’m always open to discussing web projects, data work, cybersecurity challenges, and new opportunities.
        </p>
        <a
          ref={emailButtonRef}
          href={`mailto:${email}`}
          className="relative mt-7 inline-flex min-h-11 items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
        >
          Email me at {email}
        </a>
      </div>
    </section>
  )
}
