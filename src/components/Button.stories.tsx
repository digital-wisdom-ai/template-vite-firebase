import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { DesignTokensProvider } from '@context/DesignTokensContext'

const meta = {
  title: 'Components/Button',
  component: Button,
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
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
