import type { Meta, StoryObj } from '@storybook/react-vite'
import { User } from 'firebase/auth'
import Profile from './Profile'
import { DesignTokensProvider } from '@context/DesignTokensContext'
import { AuthContext } from '@context/auth'

const meta = {
  title: 'Pages/Profile',
  component: Profile,
  decorators: [
    (Story) => (
      <DesignTokensProvider>
        <AuthContext.Provider
          value={{
            user: {
              email: 'demo@example.com',
              displayName: 'Demo User',
            } as User,
          }}
        >
          <Story />
        </AuthContext.Provider>
      </DesignTokensProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
