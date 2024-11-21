import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '#/components/defaul-components/sidebar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    fullName: { control: 'text' },
    jobRole: { control: 'text' },
    profileImageUrl: { control: 'text' }
  }
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SideBar: Story = {
  args: {
    fullName: 'John Doe',
    jobRole: 'Developer'
  }
};
