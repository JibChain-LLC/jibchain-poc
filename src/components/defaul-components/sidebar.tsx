'use client';

import { User } from 'flowbite-react-icons/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '#/lib/utils';
import { sidebarLinks } from '#/utils/utils';
import Logo from '../coeus-logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface SideBarProps {
  fullName: string;
  jobRole: string;
  profileImageUrl?: string;
}

export default function Sidebar(props: SideBarProps) {
  const { fullName, jobRole, profileImageUrl } = props;

  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const setHover = (h: boolean) => {
    return () => setIsHovered(h);
  };

  return (
    <nav
      className={cn(
        isHovered ? 'w-64' : 'w-16',
        `fixed z-10 flex min-h-screen flex-col items-center justify-between overflow-hidden bg-green-900 text-white transition-all duration-200`
      )}
      onMouseEnter={setHover(true)}
      onMouseLeave={setHover(false)}>
      <div className='mt-8 flex w-full justify-center px-5'>
        <Logo isActive={isHovered} className='shrink-0' />
      </div>

      <div className='flex w-full grow flex-col items-center justify-center gap-1.5 pl-2'>
        {sidebarLinks.map((item) => {
          const isActive = pathname?.startsWith(item.link);

          return (
            <Link
              key={item.name}
              href={item.link}
              className={cn(
                'h-12 w-full border-r-4 border-transparent',
                isActive && 'border-r-green-400',
                'hover:[&>div]:bg-black/25'
              )}>
              <div className='mr-1 flex h-full items-center justify-start gap-3 rounded-md p-2 pr-0 transition-colors'>
                <item.icon
                  className={cn(
                    'shrink-0',
                    isActive ? 'fill-green-400' : 'fill-white'
                  )}
                />
                <span
                  className={cn('whitespace-nowrap', !isHovered && 'hidden')}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <Link
        href='/user'
        className='mt-auto h-16 w-full items-center gap-2 p-2 pt-0 hover:[&>div]:bg-black/25'>
        <div className='flex gap-2 rounded-md p-2 transition-colors'>
          <Avatar className='size-8 rounded-full'>
            <AvatarImage src={profileImageUrl} alt='@shadcn' />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className={cn('flex flex-col', !isHovered && 'hidden')}>
            <span className='whitespace-nowrap text-sm font-bold text-white'>
              {fullName}
            </span>
            <span className='whitespace-nowrap text-xs text-white'>
              {jobRole}
            </span>
          </div>
        </div>
      </Link>
    </nav>
  );
}