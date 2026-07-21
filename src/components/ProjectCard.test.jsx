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
})
