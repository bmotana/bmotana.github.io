import { render, screen } from '@testing-library/react'
import Contact from './Contact'
import { setViewport, VIEWPORTS } from '../test/viewport'

describe('Contact', () => {
  it('gives the email action a 44px minimum touch target', () => {
    setViewport(VIEWPORTS.mobileCompact)
    render(<Contact />)

    expect(screen.getByRole('link', { name: /Email me at/ })).toHaveClass('min-h-11')
  })
})
