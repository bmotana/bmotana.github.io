import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { setViewport, VIEWPORTS } from '../test/viewport'

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
    expect(screen.getByRole('link', { name: 'GitHub ↗' })).toHaveAttribute(
      'href',
      'https://github.com/bmotana',
    )
    expect(screen.getByAltText('Profile Picture')).toHaveAttribute('src', 'https://github.com/bmotana.png')
  })

  it('uses a stacked mobile layout that expands on larger screens', () => {
    setViewport(VIEWPORTS.mobile)
    render(<Navbar />)

    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.className).toMatch(/flex-col/)
    expect(nav.className).toMatch(/items-center/)
    expect(nav.className).toMatch(/text-center/)
    expect(nav.className).toMatch(/sm:flex-row/)
    expect(nav.className).toMatch(/sm:text-left/)
    expect(nav.className).toMatch(/gap-3/)

    const projectsLink = screen.getByRole('link', { name: 'Projects' })
    expect(projectsLink.className).toMatch(/min-h-10/)

    const links = screen.getByRole('list')
    expect(links.className).toMatch(/justify-center/)
    expect(links.className).toMatch(/sm:justify-end/)
  })
})
