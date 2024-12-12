'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '#/components/ui/card';
import { cn } from '#/lib/utils';

export const buttons = [
  { label: 'Account', href: '/user' },
  { label: 'Billing & Subscription', href: '/user/billing' },
  { label: 'Notifications', href: '/user/notifications' },
  { label: 'Organization', href: '/user/organization' }
];

export default function UserContentNav() {
  const pathname = usePathname();

  return (
    <Card className='grow overflow-y-auto'>
      <CardContent className='flex flex-col gap-2'>
        {buttons.map((button) => (
          <Link
            key={button.label}
            href={button.href}
            className={cn(
              'rounded-md border border-transparent p-3 text-base font-semibold transition-colors hover:bg-gray-100',
              pathname === button.href &&
                'pointer-events-none border-green-700 bg-green-50 text-green-700'
            )}>
            {button.label}
          </Link>
        ))}

        <Link
          href={'/logout'}
          className='flex flex-row items-center justify-between rounded-md border border-transparent p-3 text-base font-semibold text-red-700 transition-colors hover:border-red-700 hover:bg-red-50'>
          Logout
          <LogOut size={20} />
        </Link>
      </CardContent>
    </Card>
  );
}
