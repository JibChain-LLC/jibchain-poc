'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MiniLogo from '../../images/mini-logo.svg';
import Logo from '../../images/logo.svg';
import UserLogo from '../../images/user.svg';
import Image from 'next/image';
import { sidebarLinks } from '#/utils/utils';
import Link from 'next/link';

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`bg-[#01392c] min-h-screen ${
        isHovered ? 'w-64' : 'w-20'
      } fixed z-10 transition-all duration-200 flex flex-col items-center text-white p-4 overflow-hidden justify-between`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered ? 0 : 'unset' }}>
      <div className='text-2xl font-bold w-full flex justify-center'>
        <div className=''>
          {isHovered ? (
            <Image src={Logo} alt='Full Logo' />
          ) : (
            <Image src={MiniLogo} alt='Half Logo' />
          )}
        </div>
      </div>

      <div className='flex flex-col gap-4 w-full items-center flex-grow justify-center'>
        {sidebarLinks.map((item) => {
          const isActive = pathname.startsWith(item.link);

          return (
            <Link
              key={item.name}
              onClick={() => {
                setIsHovered(false);
              }}
              href={item.link}
              className={`flex items-center gap-4 w-full h-[50px] p-2 rounded-md 
               transition-colors`}>
              {item.icon && typeof item.icon === 'function' ? (
                <item.icon isActive={isActive} />
              ) : (
                <Image
                  src={item.icon}
                  alt=''
                  className={`w-6 h-6 min-w-6 min-h-6 ${isActive ? 'text-[#fff]' : ''}`}
                />
              )}
              <span className='flex flex-row justify-between items-center w-full'>
                <span
                  className={`${
                    isHovered ? 'opacity-100 ' : 'opacity-0'
                  } text-sm transition-opacity duration-300 whitespace-nowrap`}>
                  {isHovered ? item.name : ''}
                </span>
                {isActive && (
                  <span className='inline-block h-[70px] min-h-[1em] w-1 bg-green-500 -mr-4'></span>
                )}
              </span>
            </Link>
          );
        })}
      </div>

      <Link href='/user' onClick={() => setIsHovered(false)}>
        <div className='mt-auto flex items-center gap-4 p-2 w-full border-t border-gray-500 pt-4'>
          <Image
            src={UserLogo}
            alt='User Profile'
            className='w-8 h-8 rounded-full'
          />
          <div
            className={`${
              isHovered ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300 lg:block`}>
            {isHovered && (
              <>
                <div className='font-bold text-white text-sm'>Jamie Smith</div>
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
