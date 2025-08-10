/** @jsxImportSource @emotion/react */
import Profile from './components/Profile'
import { DesignTokensProvider } from '@context/DesignTokensContext'
import { AuthProvider } from './context/AuthContext'
import { useDesignTokens } from '@hooks/useDesignTokens'
import { TOKENS } from '@gen/tokenConstants'

function AppContent() {
  const { getValue } = useDesignTokens()

  return (
    <div
      data-testid='app-root'
      css={{
        margin: 0,
        padding: 0,
        fontFamily: getValue(TOKENS.typography.fontFamily.primary),
        backgroundColor: getValue(TOKENS.color.neutral[50]),
        minHeight: '100vh',
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
      }}
    >
      <AuthProvider>
        <Profile />
      </AuthProvider>
    </div>
  )
}

export function App() {
  return (
    <DesignTokensProvider>
      <AppContent />
    </DesignTokensProvider>
  )
}
