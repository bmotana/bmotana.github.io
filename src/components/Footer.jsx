export default function Footer() {
  return (
    <footer className="border-t border-zinc-700/80 px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-sm text-zinc-300">
        <p>© {new Date().getFullYear()} Ben Motana. All rights reserved.</p>
        <ul className="flex items-center gap-6">
          <li><a href="https://github.com/bmotana" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-50">GitHub</a></li>
          <li><a href="https://linkedin.com/in/bmotana1" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-50">LinkedIn</a></li>
          <li><a href="mailto:bmotana1@gmail.com" className="transition-colors hover:text-zinc-50">Email</a></li>
        </ul>
      </div>
    </footer>
  )
}
