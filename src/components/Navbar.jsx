import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const sections = navItems
      .map(({ section }) => document.getElementById(section))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) setActiveSection(visibleEntry.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.2, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl flex-col items-center gap-3 rounded-2xl border border-white/15 bg-zinc-900/55 px-3.5 py-3 text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-3 sm:text-left"
      >
        <a
          href="#"
          className="group relative flex min-w-0 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md text-base font-semibold tracking-tight text-zinc-100 transition-opacity hover:opacity-95 sm:justify-start sm:gap-2.5 sm:text-lg"
        >
          <span className="truncate">
            <span>benmotana</span>
            <span className="text-indigo-400">.</span>
            <span>dev</span>
          </span>
          <img
            src="https://github.com/bmotana.png"
            alt="Profile Picture"
            className="h-7 w-7 shrink-0 rounded-full border border-indigo-400/30 object-cover shadow-xs ring-2 ring-indigo-500/20 transition-transform duration-300 group-hover:scale-105 sm:h-7 sm:w-7"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-[-25%] left-[-45%] w-1/3 -translate-x-[190%] rotate-12 bg-linear-to-r from-transparent via-white/80 to-transparent opacity-0 transition-all duration-900 ease-out group-hover:translate-x-[340%] group-hover:opacity-100"
          />
        </a>
        <ul className="flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-200 sm:justify-end sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.section
            return (
              <li key={item.section}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex min-h-10 items-center rounded-full px-3.5 py-2 transition-all duration-300 ease-out hover:-translate-y-px hover:bg-white/10 hover:text-zinc-50 hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)] sm:min-h-0 sm:px-4 ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-100 shadow-[inset_0_0_0_1px_rgba(165,180,252,0.24)]'
                      : ''
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
          <li>
            <a
              href="https://github.com/bmotana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-full border border-indigo-300/30 bg-indigo-500/15 px-3.5 py-2 text-indigo-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-indigo-200/50 hover:bg-indigo-500/22 hover:shadow-[0_6px_14px_rgba(99,102,241,0.22)] sm:min-h-0 sm:px-4"
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
