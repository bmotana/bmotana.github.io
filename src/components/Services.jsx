import { useEffect, useRef, useState } from 'react'

const services = [
  {
    title: 'Frontend Development',
    description:
      'Responsive, component-driven interfaces built with a focus on speed, accessibility, and clean UX.',
  },
  {
    title: 'UI Implementation',
    description:
      'Turning design ideas into polished, production-ready pages with consistent spacing, typography, and interaction.',
  },
  {
    title: 'Performance Optimization',
    description:
      'Improving load time and runtime performance with practical optimizations that keep sites fast and smooth.',
  },
]

const capabilities = [
  'React',
  'JavaScript',
  'Tailwind CSS',
  'Node.js',
  'REST APIs',
  'Responsive Design',
  'Git/GitHub',
  'Deployment',
]

export default function Services() {
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const speedRef = useRef(34)
  const animationFrameRef = useRef(null)
  const lastTimeRef = useRef(0)
  const carouselItems = [...capabilities, ...capabilities]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let loopWidth = track.scrollWidth / 2
    if (!loopWidth) return

    const handleResize = () => {
      loopWidth = track.scrollWidth / 2
    }

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const deltaSeconds = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      const targetSpeed = isPaused ? 0 : 14
      const easing = 1 - Math.exp(-8 * deltaSeconds)
      speedRef.current += (targetSpeed - speedRef.current) * easing

      offsetRef.current = (offsetRef.current + speedRef.current * deltaSeconds) % loopWidth
      track.style.transform = `translateX(-${offsetRef.current}px)`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
      lastTimeRef.current = 0
    }
  }, [isPaused])

  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-widest text-indigo-400 uppercase">
          Services + capabilities
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          How I can help
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
          >
            <h3 className="mb-3 text-lg font-semibold text-zinc-100">
              {service.title}
            </h3>
            <p className="text-sm leading-7 text-zinc-400">{service.description}</p>
          </article>
        ))}
      </div>

      <div
        className="relative mt-10 overflow-hidden"
        tabIndex="0"
        aria-label="Technical skills. Animation pauses while focused or hovered."
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-zinc-950/45 via-zinc-950/10 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-zinc-950/45 via-zinc-950/10 to-transparent" />
        <div ref={trackRef} className="flex w-max gap-3 will-change-transform">
          {carouselItems.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300 whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
