import projects from '../data/projects'
import ProjectCard from './ProjectCard'

// .map() turns each object in projects.js into a <ProjectCard> component
export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Selected work</h2>
        <p className="mt-2 text-zinc-300">A selection of shipped work and the thinking behind it.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            outcome={project.outcome}
            tags={project.tags}
            liveUrl={project.liveUrl}
            repoUrl={project.repoUrl}
          />
        ))}
      </div>
    </section>
  )
}
