import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders the profile component', () => {
    render(<App />)

    // Check for profile heading
    expect(
      screen.getByRole('heading', {
        name: /profile/i,
      }),
    ).toBeInTheDocument()

    // Check for email field
    expect(screen.getByText(/email:/i)).toBeInTheDocument()
  })

  it('renders with proper structure', () => {
    render(<App />)

    // Verify the basic structure is in place
    const rootElement = screen.getByTestId('app-root')
    expect(rootElement).toBeInTheDocument()

    // Verify it contains both text elements
    const heading = rootElement.querySelector('h1')
    const paragraph = rootElement.querySelector('p')
    expect(heading).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
  })
})
