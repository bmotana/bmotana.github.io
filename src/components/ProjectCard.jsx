function BrowserPreview({ title }) {
  return (
    <div
      aria-hidden="true"
      className="mb-6 overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80 shadow-inner shadow-black/30"
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/4 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2 h-1.5 w-24 rounded-full bg-zinc-700/80" />
      </div>
      <div className="relative h-32 overflow-hidden bg-linear-to-br from-indigo-500/20 via-zinc-950 to-sky-400/10 p-4 sm:h-36">
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-indigo-400/20 blur-2xl" />
        <div className="relative">
          <div className="mb-3 h-2 w-16 rounded-full bg-indigo-300/70" />
          <div className="h-5 w-3/4 rounded bg-zinc-100/90" />
          <div className="mt-2 h-2 w-2/3 rounded bg-zinc-500/80" />
          <div className="mt-5 flex gap-2">
            <span className="h-5 w-16 rounded bg-indigo-500/90" />
            <span className="h-5 w-16 rounded border border-zinc-500/80" />
          </div>
        </div>
        <span className="sr-only">Preview of {title}</span>
      </div>
    </div>
  )
}

export default function ProjectCard({ title, description, outcome, tags, liveUrl, repoUrl }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/60 hover:shadow-2xl hover:shadow-indigo-950/50 focus-within:-translate-y-1 focus-within:border-indigo-400/60 focus-within:shadow-2xl focus-within:shadow-indigo-950/50 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-linear-to-r from-transparent via-indigo-300 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
      <BrowserPreview title={title} />
      <h3 className="mb-2 text-lg font-semibold text-zinc-100">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-300">{description}</p>
      {outcome && (
        <p className="mb-4 mt-3 border-l-2 border-indigo-400/70 pl-3 text-sm leading-relaxed text-zinc-300">
          {outcome}
        </p>
      )}
      <ul className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full border border-zinc-600/90 px-2.5 py-0.5 text-xs text-zinc-300">
            {tag}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4 text-sm">
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300">
          Live demo ↗
        </a>
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-zinc-100">
          Source code ↗
        </a>
      </div>
    </article>
  )
}
