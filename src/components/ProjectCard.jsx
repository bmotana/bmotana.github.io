// Receives one project object as props and renders a card.
// You don't need to edit this file — edit projects.js instead.
export default function ProjectCard({ title, description, tags, liveUrl, repoUrl }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-indigo-950/40">
      <div className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <h3 className="mb-2 text-lg font-semibold text-zinc-100">{title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">{description}</p>
      <ul className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-400">
            {tag}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4 text-sm">
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300">
          Live demo ↗
        </a>
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 transition-colors hover:text-zinc-300">
          Source code ↗
        </a>
      </div>
    </article>
  )
}
