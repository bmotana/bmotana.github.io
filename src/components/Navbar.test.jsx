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

  it('keeps a compact single-row layout with accessible mobile targets', () => {
    setViewport(VIEWPORTS.mobileCompact)
    render(<Navbar />)

    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav.className).toMatch(/flex-row/)
    expect(nav.className).toMatch(/justify-between/)
    expect(nav.className).not.toMatch(/flex-col/)
    expect(screen.getByAltText('Profile Picture').className).toMatch(/block/)

    for (const link of [
      screen.getByRole('link', { name: 'Projects' }),
      screen.getByRole('link', { name: 'Contact' }),
      screen.getByRole('link', { name: 'GitHub ↗' }),
    ]) {
      expect(link).toHaveClass('min-h-11', 'min-w-11')
    }

    const links = screen.getByRole('list')
    expect(links.className).toMatch(/flex-nowrap/)
    expect(screen.getByRole('banner')).toHaveAttribute('data-site-navbar')
  })
})
