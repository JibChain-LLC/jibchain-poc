'use client';

import { User as UserType } from '@supabase/supabase-js';
import { CreditCard, LogOut, Settings, User, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import signOut from '#/lib/actions/user-sign-out';

interface UserMenuProps {
  user: UserType;
}

export default function UserMenu(props: UserMenuProps) {
  const { user } = props;
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='rounded-[50%]' size={'icon'}>
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>{user.email ?? 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push('/organization/profile')}>
            <User className='mr-2 size-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/organization')}>
            <Users className='mr-2 size-4' />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <CreditCard className='mr-2 size-4' />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings className='mr-2 size-4' />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className='mr-2 size-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
