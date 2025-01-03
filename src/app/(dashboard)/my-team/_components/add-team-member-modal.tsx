import Image from 'next/image';
import { useState } from 'react';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '#/components/ui/dialog';
import { Input } from '#/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import Plus from '#/images/plus-icon.svg';

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelect?: (role: string) => void;
}

export function AddTeamMemberModal({
  isOpen,
  onClose,
  onRoleSelect
}: AddTeamMemberModalProps) {
  const [userRole, setUserRole] = useState<string>('Owner');

  const handleRoleChange = (role: string) => {
    setUserRole(role);
    if (onRoleSelect) onRoleSelect(role);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] lg:w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-lg'>
            Invite a new team member
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-row items-start justify-between gap-4'>
          {/* Email Input */}
          <div className='w-full'>
            <Input
              type='email'
              name='email'
              id='email'
              className='w-full border-green-700'
              placeholder='Separate emails with a comma'
            />
          </div>

          {/* Role Selection */}
          <div className='w-full max-w-[130px]'>
            <Select value={userRole} onValueChange={handleRoleChange}>
              <SelectTrigger
                className='w-full border-gray-300 bg-white'
                id='role'>
                <SelectValue>{userRole}</SelectValue>
              </SelectTrigger>
              <SelectContent className='max-w-[200px] bg-white text-black'>
                <SelectItem value='Admin'>Admin</SelectItem>
                <SelectItem value='Owner'>Owner</SelectItem>
                <SelectItem
                  value='Editor'
                  className='rounded-none border-b border-gray-200'>
                  Editor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className='mt-1.5 flex w-full items-start justify-start'>
          <Button
            type='submit'
            onClick={onClose}
            className='flex items-center gap-2 bg-[#046C4E] p-4 hover:bg-[#046C4E]'>
            <Image src={Plus} alt='de' />
            Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
