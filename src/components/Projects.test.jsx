import { render, screen } from '@testing-library/react'
import Projects from './Projects'
import { gridColumnsAtWidth, setViewport, VIEWPORTS } from '../test/viewport'

describe('Projects', () => {
  it('renders the projects section and cards', () => {
    render(<Projects />)

    expect(screen.getByRole('heading', { name: 'Selected work' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Developer Portfolio' })).toBeInTheDocument()
    expect(screen.getByText(/responsive layout, smooth navigation/i)).toBeInTheDocument()
  })

  it.each([
    [VIEWPORTS.mobileCompact, 1],
    [VIEWPORTS.mobile, 1],
    [VIEWPORTS.mobileLarge, 1],
    [VIEWPORTS.tablet, 2],
    [VIEWPORTS.desktop, 2],
  ])('uses the expected responsive column count', (viewport, expectedColumns) => {
    setViewport(viewport)
    const { container } = render(<Projects />)
    const grid = container.querySelector('#projects .grid')

    expect(gridColumnsAtWidth(grid.className, viewport.width)).toBe(expectedColumns)
  })
})
