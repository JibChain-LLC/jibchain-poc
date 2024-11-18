'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { sidebarLinks } from '#/utils/utils';
import Logo from '../../images/logo.svg';
import MiniLogo from '../../images/mini-logo.svg';
import UserLogo from '../../images/user.svg';

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`min-h-screen bg-[#01392c] ${
        isHovered ? 'w-64' : 'w-20'
      } fixed z-10 flex flex-col items-center justify-between overflow-hidden p-4 text-white transition-all duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered ? 0 : 'unset' }}>
      <div className='flex w-full justify-center text-2xl font-bold'>
        <div className=''>
          {isHovered ? (
            <Image src={Logo} alt='Full Logo' />
          ) : (
            <Image src={MiniLogo} alt='Half Logo' />
          )}
        </div>
      </div>

      <div className='flex w-full grow flex-col items-center justify-center gap-4'>
        {sidebarLinks.map((item) => {
          const isActive = pathname.startsWith(item.link);

          return (
            <Link
              key={item.name}
              onClick={() => {
                setIsHovered(false);
              }}
              href={item.link}
              className={`flex h-[50px] w-full items-center gap-4 rounded-md p-2 transition-colors`}>
              {item.icon && typeof item.icon === 'function' ? (
                <item.icon isActive={isActive} />
              ) : (
                <Image
                  src={item.icon}
                  alt=''
                  className={`size-6 min-h-6 min-w-6 ${isActive ? 'text-white' : ''}`}
                />
              )}
              <span className='flex w-full flex-row items-center justify-between'>
                <span
                  className={`${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  } whitespace-nowrap text-sm transition-opacity duration-300`}>
                  {isHovered ? item.name : ''}
                </span>
                {isActive && (
                  <span className='-mr-4 inline-block h-[70px] min-h-[1em] w-1 bg-green-500'></span>
                )}
              </span>
            </Link>
          );
        })}
      </div>

      <Link href='/user' onClick={() => setIsHovered(false)}>
        <div className='mt-auto flex w-full items-center gap-4 border-t border-gray-500 p-2 pt-4'>
          <Image
            src={UserLogo}
            alt='User Profile'
            className='size-8 rounded-full'
          />
          <div
            className={`${
              isHovered ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300 lg:block`}>
            {isHovered && (
              <>
                <div className='text-sm font-bold text-white'>Jamie Smith</div>
                <div className='text-xs text-white'>
                  Chief Operations Officer
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
