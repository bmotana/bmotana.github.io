import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the intro heading', () => {
    render(<Hero isIntroReady />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ben Motana')
    expect(screen.getByRole('link', { name: 'View my work' })).toHaveAttribute('href', '#projects')
  })
})
