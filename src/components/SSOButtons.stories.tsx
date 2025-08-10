import type { Meta, StoryObj } from '@storybook/react-vite'
import SSOButtons, { GoogleButton } from './SSOButtons'
import { DesignTokensProvider } from '@context/DesignTokensContext'

const meta = {
  title: 'Components/SSOButtons',
  component: SSOButtons,
  decorators: [
    (Story) => (
      <DesignTokensProvider>
        <Story />
      </DesignTokensProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SSOButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const GoogleButtonOnly: Story = {
  render: () => (
    <DesignTokensProvider>
      <GoogleButton />
    </DesignTokensProvider>
  ),
}

export const GoogleButtonDisabled: Story = {
  render: () => (
    <DesignTokensProvider>
      <GoogleButton disabled />
    </DesignTokensProvider>
  ),
}
