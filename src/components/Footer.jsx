export default function Footer() {
  return (
    <footer className="border-t border-zinc-700/80 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-left">
        <p className="leading-relaxed">
          © {new Date().getFullYear()} Ben Motana. All rights reserved.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <li>
            <a
              href="https://github.com/bmotana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-zinc-50"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/bmotana1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-zinc-50"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="mailto:bmotana1@gmail.com"
              className="inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-zinc-50"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
