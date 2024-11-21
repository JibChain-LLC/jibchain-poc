import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose
} from '#/components/ui/dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Deactivate User?</DialogTitle>
          <DialogDescription>
            Are you sure you want to deactivate this user from your
            organization?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant={'destructive'}>Deactivate</Button>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
