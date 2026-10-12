import { render, screen } from '@testing-library/react'
import ProjectCard from './ProjectCard'

describe('ProjectCard', () => {
  it('renders the project title', () => {
    render(
      <ProjectCard
        title="My Portfolio"
        description="A personal site"
        tags={['React']}
        liveUrl="https://example.com"
        repoUrl="https://github.com/example"
      />,
    )

    expect(screen.getByRole('heading', { name: 'My Portfolio' })).toBeInTheDocument()
  })

  it('gives project action links mobile-friendly touch targets', () => {
    render(
      <ProjectCard
        title="My Portfolio"
        description="A personal site"
        tags={['React']}
        liveUrl="https://example.com"
        repoUrl="https://github.com/example"
      />,
    )

    expect(screen.getByRole('link', { name: /Live demo/ })).toHaveClass('min-h-10')
    expect(screen.getByRole('link', { name: /Source code/ })).toHaveClass('min-h-10')
  })
})
