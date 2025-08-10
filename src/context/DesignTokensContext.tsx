import { css } from '@emotion/react'
import { designTokensClient, type TokenData } from '@lib/designTokens'
import { getTokenMapSync } from '@lib/tokenHelpers'
import { ReactNode, useEffect, useState } from 'react'

import {
  DesignTokensContext,
  type DesignTokensContextType,
} from './designTokensTypes'

export function DesignTokensProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<TokenData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    designTokensClient.loadTokens().then((data) => {
      setTokens(data)
      setLoading(false)
    })
  }, [])

  function getValue(path: string): string {
    if (!tokens) return ''
    const keys = path.split('.')
    let value: any = tokens
    for (const key of keys) {
      value = value?.[key]
    }
    return value || ''
  }

  function getClasses(pathOrObject: string | Record<string, any>): any {
    if (!tokens) return css({})

    const valueMap =
      typeof pathOrObject === 'string'
        ? getTokenMapSync(tokens, pathOrObject)
        : pathOrObject

    if (typeof valueMap === 'string') {
      return css({ padding: valueMap })
    }

    if (valueMap.mobile || valueMap.tablet || valueMap.desktop) {
      return css(buildResponsiveStyles(valueMap, tokens.breakpoints))
    }

    return css(buildFlatStyles(valueMap))
  }

  function buildResponsiveStyles(valueMap: any, breakpoints: any): any {
    const styles: any = {}

    if (valueMap.mobile) {
      styles.padding = valueMap.mobile
    }
    if (valueMap.tablet) {
      styles[`@media (min-width: ${breakpoints.tablet})`] = {
        padding: valueMap.tablet,
      }
    }
    if (valueMap.desktop) {
      styles[`@media (min-width: ${breakpoints.desktop})`] = {
        padding: valueMap.desktop,
      }
    }

    return styles
  }

  function buildFlatStyles(valueMap: any): any {
    const styles: any = {}
    for (const [key, value] of Object.entries(valueMap)) {
      if (typeof value === 'string') {
        styles[key] = getValue(value)
      }
    }
    return styles
  }

  const contextValue: DesignTokensContextType = {
    getClasses,
    getValue,
    isLoading: loading,
  }

  return (
    <DesignTokensContext.Provider value={contextValue}>
      {children}
    </DesignTokensContext.Provider>
  )
}
