import { render, screen } from '@testing-library/react'
import Services from './Services'
import { gridColumnsAtWidth, setViewport, VIEWPORTS } from '../test/viewport'

describe('Services', () => {
  it('renders the services section heading', () => {
    render(<Services />)

    expect(screen.getByRole('heading', { name: 'How I can help' })).toBeInTheDocument()
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('Data Science')).toBeInTheDocument()
    expect(screen.getByText('Cybersecurity')).toBeInTheDocument()
  })

  it.each([
    [VIEWPORTS.mobileCompact, 1],
    [VIEWPORTS.mobile, 1],
    [VIEWPORTS.mobileLarge, 1],
    [VIEWPORTS.tablet, 2],
    [VIEWPORTS.desktop, 3],
  ])('uses the expected responsive column count', (viewport, expectedColumns) => {
    setViewport(viewport)
    const { container } = render(<Services />)
    const grid = container.querySelector('#services .grid')

    expect(gridColumnsAtWidth(grid.className, viewport.width)).toBe(expectedColumns)
  })
})
