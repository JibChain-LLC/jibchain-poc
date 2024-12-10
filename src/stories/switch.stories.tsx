import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '#/components/ui/switch'; // Adjust the path to the Switch component if necessary

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    onCheckedChange: { action: 'onCheckedChange' }
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
    disabled: false
  }
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    disabled: false
  }
};

export const Disabled: Story = {
  args: {
    defaultChecked: false,
    disabled: true
  }
};

export const CheckedDisabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true
  }
};
