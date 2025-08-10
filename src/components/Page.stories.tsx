import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page } from './Page'
import { DesignTokensProvider } from '@context/DesignTokensContext'

const meta = {
  title: 'Pages/Demo',
  component: Page,
  decorators: [
    (Story) => (
      <DesignTokensProvider>
        <Story />
      </DesignTokensProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
