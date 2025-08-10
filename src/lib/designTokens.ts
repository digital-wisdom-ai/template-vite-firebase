import { fetchAndActivate, getValue } from 'firebase/remote-config'
import { remoteConfig } from '@lib/firebase'
import tokensJson from '@gen/tokens.json'

export interface TokenData {
  color: Record<string, any>
  spacing: Record<string, any>
  typography: Record<string, any>
  borderRadius: Record<string, string>
  breakpoints: Record<string, string>
}

export class DesignTokensClient {
  private cache: TokenData | null = null
  private loading: Promise<TokenData> | null = null

  async loadTokens(): Promise<TokenData> {
    if (this.cache) return this.cache
    if (this.loading) return this.loading

    this.loading = (async () => {
      try {
        await fetchAndActivate(remoteConfig)
        const tokensJson = getValue(remoteConfig, 'design_tokens').asString()
        this.cache = JSON.parse(tokensJson)
        return this.cache!
      } catch (error) {
        console.warn(
          'Failed to load design tokens from Firebase Remote Config:',
          error,
        )
        this.cache = tokensJson as TokenData
        return this.cache
      }
    })()

    return this.loading
  }

  async getTokenValue(path: string): Promise<string> {
    const tokens = await this.loadTokens()
    const keys = path.split('.')
    let value: any = tokens

    for (const key of keys) {
      value = value?.[key]
    }

    return value || ''
  }

  async getTokenMap(path: string): Promise<Record<string, any>> {
    const tokens = await this.loadTokens()
    const keys = path.split('.')
    let value: any = tokens

    for (const key of keys) {
      value = value?.[key]
    }

    return value || {}
  }

  async getAllTokens(): Promise<TokenData> {
    return this.loadTokens()
  }

  clearCache(): void {
    this.cache = null
    this.loading = null
  }
}

export const designTokensClient = new DesignTokensClient()
