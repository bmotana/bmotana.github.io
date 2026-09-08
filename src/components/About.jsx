import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const text = textRef.current

    if (!section || !heading || !text) return undefined

    const ctx = gsap.context(() => {
      gsap.set(heading, {
        x: 80,
        opacity: 0,
      })

      gsap.set(text, {
        scale: 1.12,
        opacity: 0,
        transformOrigin: 'top right',
      })

      const runAnimation = () => {
        gsap.to(heading, {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          overwrite: 'auto',
        })

        gsap.to(text, {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 78%',
        once: true,
        onEnter: runAnimation,
      })

      ScrollTrigger.refresh()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mx-auto max-w-5xl px-6 py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <p className="mb-3 text-sm font-medium tracking-widest text-indigo-400 uppercase">
            About me
          </p>
          <h2
            ref={headingRef}
            className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl"
          >
            Building products that feel smooth and useful
          </h2>
        </div>
        <div ref={textRef} className="space-y-4 text-zinc-300">
          <p>
            I am a frontend-focused developer who enjoys turning ideas into
            clean, responsive, and accessible web experiences.
          </p>
          <p>
            My current stack includes React, Tailwind CSS, and Node.js. I care
            about performance, thoughtful UI details, and maintainable code.
          </p>
          <p>
            Outside of coding, I am usually learning new tools, improving design
            skills, and shipping small projects to keep getting better.
          </p>
        </div>
      </div>
    </section>
  )
}


