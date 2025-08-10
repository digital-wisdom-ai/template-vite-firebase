import { useContext } from 'react'
import {
  DesignTokensContext,
  type DesignTokensContextType,
} from '@context/designTokensTypes'

export function useDesignTokens(): DesignTokensContextType {
  const context = useContext(DesignTokensContext)
  if (context === undefined) {
    throw new Error(
      'useDesignTokens must be used within a DesignTokensProvider',
    )
  }
  return context
}
