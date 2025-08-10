import { createContext } from 'react'

export interface DesignTokensContextType {
  getClasses: (pathOrObject: string | Record<string, any>) => any
  getValue: (path: string) => string
  isLoading: boolean
}

export const DesignTokensContext = createContext<
  DesignTokensContextType | undefined
>(undefined)
