/** @jsxImportSource @emotion/react */
import React from 'react'
import { useDesignTokens } from '@hooks/useDesignTokens'
import { TOKENS } from '@gen/tokenConstants'
import { Header } from './Header'
import { Button } from './Button'

export function Page() {
  const { getClasses, getValue } = useDesignTokens()

  const pageClasses = getClasses(TOKENS.layout.container.page)

  return (
    <article>
      <Header />

      <section
        css={[
          pageClasses,
          {
            fontFamily: getValue(TOKENS.typography.fontFamily.primary),
            lineHeight: getValue(TOKENS.typography.lineHeight.normal),
          },
        ]}
      >
        <h2
          css={{
            fontSize: getValue(TOKENS.typography.fontSize.h2),
            fontWeight: getValue(TOKENS.typography.fontWeight.bold),
            color: getValue(TOKENS.color.primary[700]),
            marginBottom: getValue(TOKENS.spacing.lg),
          }}
        >
          🎨 Live Design Tokens in Action!
        </h2>

        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: getValue(TOKENS.spacing.xl),
            marginBottom: getValue(TOKENS.spacing.xxl),
          }}
        >
          <div
            css={{
              padding: getValue(TOKENS.spacing.lg),
              backgroundColor: getValue(TOKENS.color.neutral[50]),
              borderRadius: getValue(TOKENS.borderRadius.lg),
              border: `1px solid ${getValue(TOKENS.color.neutral[200])}`,
            }}
          >
            <h3
              css={{
                fontSize: getValue(TOKENS.typography.fontSize.h4),
                fontWeight: getValue(TOKENS.typography.fontWeight.semibold),
                color: getValue(TOKENS.color.primary[600]),
                marginBottom: getValue(TOKENS.spacing.md),
              }}
            >
              🚀 Firebase-Powered
            </h3>
            <p
              css={{
                fontSize: getValue(TOKENS.typography.fontSize.md),
                color: getValue(TOKENS.color.neutral[700]),
                marginBottom: getValue(TOKENS.spacing.md),
              }}
            >
              These tokens sync live from Firebase Remote Config. Change values
              in Firebase and watch the UI update instantly!
            </p>
            <Button variant='primary' size='medium' label='Primary Action' />
          </div>

          <div
            css={{
              padding: getValue(TOKENS.spacing.lg),
              backgroundColor: getValue(TOKENS.color.primary[50]),
              borderRadius: getValue(TOKENS.borderRadius.lg),
              border: `1px solid ${getValue(TOKENS.color.primary[200])}`,
            }}
          >
            <h3
              css={{
                fontSize: getValue(TOKENS.typography.fontSize.h4),
                fontWeight: getValue(TOKENS.typography.fontWeight.semibold),
                color: getValue(TOKENS.color.primary[600]),
                marginBottom: getValue(TOKENS.spacing.md),
              }}
            >
              🎯 Type-Safe Tokens
            </h3>
            <p
              css={{
                fontSize: getValue(TOKENS.typography.fontSize.md),
                color: getValue(TOKENS.color.neutral[700]),
                marginBottom: getValue(TOKENS.spacing.md),
              }}
            >
              Generated TypeScript constants provide autocomplete and prevent
              typos. No more magic strings!
            </p>
            <Button variant='secondary' size='large' label='Secondary Large' />
          </div>
        </div>

        <div
          css={{
            display: 'flex',
            gap: getValue(TOKENS.spacing.md),
            flexWrap: 'wrap',
            marginBottom: getValue(TOKENS.spacing.xl),
          }}
        >
          <Button variant='primary' size='small' label='Small Primary' />
          <Button variant='primary' size='medium' label='Medium Primary' />
          <Button variant='primary' size='large' label='Large Primary' />
          <Button variant='secondary' size='small' label='Small Secondary' />
          <Button variant='secondary' size='medium' label='Medium Secondary' />
          <Button variant='secondary' size='large' label='Large Secondary' />
        </div>

        <div
          css={{
            padding: getValue(TOKENS.spacing.xl),
            backgroundColor: getValue(TOKENS.color.secondary[50]),
            borderRadius: getValue(TOKENS.borderRadius.xl),
            textAlign: 'center',
          }}
        >
          <h3
            css={{
              fontSize: getValue(TOKENS.typography.fontSize.h3),
              fontWeight: getValue(TOKENS.typography.fontWeight.bold),
              color: getValue(TOKENS.color.secondary[700]),
              marginBottom: getValue(TOKENS.spacing.lg),
            }}
          >
            ✨ The Power of Design Tokens
          </h3>
          <p
            css={{
              fontSize: getValue(TOKENS.typography.fontSize.lg),
              color: getValue(TOKENS.color.neutral[700]),
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Every color, spacing, and style you see comes from our token system.
            Designers can update Firebase Remote Config and see changes
            instantly across all components!
          </p>
        </div>
      </section>
    </article>
  )
}
