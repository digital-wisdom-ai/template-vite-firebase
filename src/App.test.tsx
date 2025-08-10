import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders the login screen when unauthenticated', () => {
    render(<App />)

    // Check for login button (unauthenticated state)
    expect(
      screen.getByRole('button', {
        name: /sign in with google/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders with proper structure', () => {
    render(<App />)

    // Verify the basic structure is in place
    const rootElement = screen.getByTestId('app-root')
    expect(rootElement).toBeInTheDocument()

    // Verify it contains the login button
    const button = rootElement.querySelector('button')
    expect(button).toBeInTheDocument()
  })
})
