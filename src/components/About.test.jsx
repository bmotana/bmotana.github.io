import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('renders the about section heading', () => {
    render(<About />)

    expect(
      screen.getByRole('heading', { name: 'Building products that feel smooth and useful' }),
    ).toBeInTheDocument()
  })
})
