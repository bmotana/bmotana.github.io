import { render, screen } from '@testing-library/react'
import Services from './Services'

describe('Services', () => {
  it('renders the services section heading', () => {
    render(<Services />)

    expect(screen.getByRole('heading', { name: 'How I can help' })).toBeInTheDocument()
    expect(screen.getByText('Frontend Development')).toBeInTheDocument()
  })
})
