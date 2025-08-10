/** @jsxImportSource @emotion/react */
import React from 'react'
import { useDesignTokens } from '@hooks/useDesignTokens'
import { TOKENS } from '@gen/tokenConstants'

export interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  label: string
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'medium',
  label,
  ...props
}: ButtonProps) {
  const { getClasses, getValue } = useDesignTokens()

  const buttonClasses = getClasses(TOKENS.layout.button[variant][size])

  return (
    <button
      type='button'
      css={[
        buttonClasses,
        {
          borderRadius: getValue(TOKENS.borderRadius.sm),
          fontFamily: getValue(TOKENS.typography.fontFamily.primary),
        },
      ]}
      {...props}
    >
      {label}
    </button>
  )
}
