import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { setViewport, VIEWPORTS } from '../test/viewport'

describe('Footer', () => {
  it('renders footer links', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument()
  })

  it('stacks content on mobile instead of cramming one row', () => {
    setViewport(VIEWPORTS.mobile)
    const { container } = render(<Footer />)

    const layout = container.querySelector('footer > div')
    expect(layout?.className).toMatch(/flex-col/)
    expect(layout?.className).toMatch(/items-center/)
    expect(layout?.className).toMatch(/text-center/)
    expect(layout?.className).toMatch(/sm:flex-row/)
    expect(layout?.className).toMatch(/sm:text-left/)
    expect(layout?.className).toMatch(/gap-4/)

    for (const link of [
      screen.getByRole('link', { name: 'GitHub' }),
      screen.getByRole('link', { name: 'LinkedIn' }),
      screen.getByRole('link', { name: 'Email' }),
    ]) {
      expect(link).toHaveClass('min-h-11', 'min-w-11')
    }
  })
})
