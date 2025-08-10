/** @jsxImportSource @emotion/react */
import React from 'react'
import { useDesignTokens } from '@hooks/useDesignTokens'
import { TOKENS } from '@gen/tokenConstants'
import { Button } from './Button'

export function Header() {
  const { getClasses, getValue } = useDesignTokens()

  const containerClasses = getClasses(TOKENS.layout.header.container)
  const brandClasses = getClasses(TOKENS.layout.header.brand)
  const navClasses = getClasses(TOKENS.layout.header.nav)

  return (
    <header css={containerClasses}>
      <div css={brandClasses}>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g fill='none' fillRule='evenodd'>
            <path
              d='M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z'
              fill={getValue(TOKENS.color.neutral[50])}
            />
            <path
              d='M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z'
              fill={getValue(TOKENS.color.primary[500])}
            />
            <path
              d='M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z'
              fill={getValue(TOKENS.color.primary[300])}
            />
          </g>
        </svg>
        <h1
          css={{
            margin: 0,
            fontSize: getValue(TOKENS.typography.fontSize.h3),
            fontWeight: getValue(TOKENS.typography.fontWeight.bold),
            color: getValue(TOKENS.color.neutral[800]),
          }}
        >
          Design Tokens Demo
        </h1>
      </div>
      <div css={navClasses}>
        <Button variant='secondary' size='small' label='Demo Button' />
        <Button variant='primary' size='small' label='Primary Demo' />
      </div>
    </header>
  )
}
