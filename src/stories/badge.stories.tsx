import { Meta, StoryObj } from '@storybook/react';
import { Badge } from '#/components/ui/badge';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      description: 'Control color of badge',
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline']
    },
    sz: {
      description: 'Control size of badge',
      control: 'select',
      options: ['default', 'lg']
    },
    pill: {
      description: 'Should badge be pill shaped',
      control: 'boolean'
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Pending'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Error'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline'
  }
};
