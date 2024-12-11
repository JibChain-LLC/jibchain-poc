import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '#/components/ui/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    onCheckedChange: { action: 'onCheckedChange' }
  }
} satisfies Meta<typeof Checkbox>;

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

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true
  }
};
