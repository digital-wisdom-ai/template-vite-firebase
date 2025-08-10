import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ExampleComponent } from './ExampleComponent'
import { DesignTokensProvider } from '@context/DesignTokensContext'

describe('ExampleComponent', () => {
  it('renders title and children', () => {
    render(
      <DesignTokensProvider>
        <ExampleComponent title='Test Title'>
          <div>Test Content</div>
        </ExampleComponent>
      </DesignTokensProvider>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
