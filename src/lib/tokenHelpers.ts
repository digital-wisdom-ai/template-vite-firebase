import type { TokenData } from './designTokens'

export function getTokenMapSync(
  tokens: TokenData,
  path: string,
): Record<string, any> {
  const keys = path.split('.')
  let value: any = tokens

  for (const key of keys) {
    value = value?.[key]
  }

  return value || {}
}
