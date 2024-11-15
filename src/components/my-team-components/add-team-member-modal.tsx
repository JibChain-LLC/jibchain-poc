import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import Plus from '../../images/plus-icon.svg';
import Image from 'next/image';

export function AddTeamMemberModal({ isOpen, onClose, onRoleSelect }: any) {
  const [userRole, setUserRole] = useState('Owner');

  const handleRoleChange = (role: any) => {
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
        <div className='flex flex-row items-start justify-between gap-4 '>
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
                className='w-full bg-white border-gray-300'
                id='role'>
                <SelectValue>{userRole}</SelectValue>
              </SelectTrigger>
              <SelectContent className='bg-white text-black max-w-[200px]'>
                <SelectItem value='Admin'>Admin</SelectItem>
                <SelectItem value='Owner'>Owner</SelectItem>
                <SelectItem
                  value='Editor'
                  className='border-b-[1px] rounded-none border-gray-200'>
                  Editor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className='flex items-start justify-start w-full  mt-1.5'>
          <Button
            type='submit'
            onClick={onClose}
            className='bg-[#046C4E] flex items-center gap-2 hover:bg-[#046C4E] p-4'>
            <Image src={Plus} alt='de' />
            Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
