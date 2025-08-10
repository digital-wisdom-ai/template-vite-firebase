/** @jsxImportSource @emotion/react */
import React from 'react'
import { useDesignTokens } from '@hooks/useDesignTokens'
import { TOKENS } from '@gen/tokenConstants'

interface ExampleComponentProps {
  title: string
  children: React.ReactNode
}

export function ExampleComponent({ title, children }: ExampleComponentProps) {
  const { getValue } = useDesignTokens()

  return (
    <div
      css={{
        padding: getValue(TOKENS.spacing.lg),
      }}
    >
      <h2
        css={{
          fontSize: getValue(TOKENS.typography.fontSize.h4),
          fontWeight: getValue(TOKENS.typography.fontWeight.semibold),
          color: getValue(TOKENS.color.primary[700]),
          margin: 0,
          marginBottom: getValue(TOKENS.spacing.md),
        }}
      >
        {title}
      </h2>
      <div
        css={{
          marginTop: getValue(TOKENS.spacing.md),
        }}
      >
        {children}
      </div>
    </div>
  )
}
