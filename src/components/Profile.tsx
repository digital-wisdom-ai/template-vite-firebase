/** @jsxImportSource @emotion/react */
import { getAuth, signOut } from 'firebase/auth'
import { useAuth } from '../hooks/useAuth'
import { useDesignTokens } from '@hooks/useDesignTokens'
import { TOKENS } from '@gen/tokenConstants'
import { Page } from './Page'
import { Button } from './Button'

function Profile() {
  const { user } = useAuth()
  const { getClasses, getValue } = useDesignTokens()
  const auth = getAuth()

  const containerClasses = getClasses(TOKENS.spacing.container)

  function handleLogout() {
    return signOut(auth)
  }

  return (
    <div
      css={[
        containerClasses,
        {
          backgroundColor: getValue(TOKENS.color.neutral[50]),
          minHeight: '100vh',
        },
      ]}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: getValue(TOKENS.spacing.xl),
          padding: getValue(TOKENS.spacing.lg),
          backgroundColor: getValue(TOKENS.color.primary[50]),
          borderRadius: getValue(TOKENS.borderRadius.lg),
        }}
      >
        <div>
          <h1
            css={{
              fontSize: getValue(TOKENS.typography.fontSize.h2),
              fontWeight: getValue(TOKENS.typography.fontWeight.bold),
              color: getValue(TOKENS.color.primary[700]),
              margin: 0,
              fontFamily: getValue(TOKENS.typography.fontFamily.primary),
            }}
          >
            Welcome, {user.email}!
          </h1>
          <p
            css={{
              fontSize: getValue(TOKENS.typography.fontSize.sm),
              color: getValue(TOKENS.color.neutral[600]),
              margin: 0,
              fontFamily: getValue(TOKENS.typography.fontFamily.primary),
            }}
          >
            Explore the power of live design tokens below
          </p>
        </div>
        <div css={{ display: 'flex', gap: getValue(TOKENS.spacing.md) }}>
          <Button
            variant='primary'
            size='medium'
            label='🎨 Open Storybook'
            onClick={() => window.open('http://localhost:6006', '_blank')}
          />
          <Button
            variant='secondary'
            size='medium'
            label='Logout'
            onClick={handleLogout}
          />
        </div>
      </div>

      <Page />
    </div>
  )
}

export default Profile
