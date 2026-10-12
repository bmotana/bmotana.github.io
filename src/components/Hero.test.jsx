import { render, screen } from '@testing-library/react'
import Hero from './Hero'
import { setViewport, VIEWPORTS } from '../test/viewport'

describe('Hero', () => {
  it('keeps the mobile greeting and name together without overflowing the heading', () => {
    setViewport(VIEWPORTS.mobileCompact)
    render(<Hero isIntroReady />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent("Hi, I'm Ben Motana")
    expect(heading.querySelector('.whitespace-nowrap')).toHaveTextContent("I'm Ben Motana")
    expect(heading).toHaveClass('text-2xl', 'min-[430px]:text-4xl', 'sm:text-6xl')
    expect(screen.getByRole('link', { name: 'View my work' })).toHaveAttribute('href', '#projects')
  })
})
