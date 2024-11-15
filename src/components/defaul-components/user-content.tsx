'use client';

import { Button } from '#/components/ui/button';
import { Card, CardContent } from '../ui/card';
import ShellImage from '#/images/shell.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buttons } from '#/utils/utils';

export default function UserContent() {
  const pathname = usePathname();

  const [selectedButton, setSelectedButton] = useState('');

  useEffect(() => {
    const activeButton = buttons.find((button) =>
      pathname.includes(button.href)
    );
    if (activeButton) {
      setSelectedButton(activeButton.label);
    }
  }, [pathname]);

  return (
    <div className='flex flex-col min-w-[400px] max-w-[400px] bg-gray-100 h-screen p-6 ml-14'>
      <div className='flex flex-col gap-4 w-full flex-grow'>
        <Card className='w-full min-h-[100px] flex items-center bg-white border-none shadow-md'>
          <CardContent className='flex items-center gap-12 p-4 text-black'>
            <Image
              src={ShellImage}
              alt='Shell Logo'
              className='w-[100px] h-[100px] rounded-md object-cover'
            />
            <div>
              <h2 className='text-xl font-bold'>Shell USA, Inc.</h2>
              <p className='text-gray-500'>Member since 2024</p>
            </div>
          </CardContent>
        </Card>
        <Card className='bg-white shadow-md border-t-0 border-gray-200 rounded-lg mt-4 flex-grow'>
          <CardContent className='flex flex-col p-4 space-y-2'>
            {buttons.map((button) => (
              <Link key={button.label} href={button.href} passHref>
                <Button
                  onClick={() => setSelectedButton(button.label)}
                  className={`w-full text-left justify-start text-[18px] py-6 ${
                    selectedButton === button.label
                      ? 'bg-green-50 text-green-700 font-semibold border border-green-700'
                      : 'bg-white text-gray-600'
                  }`}>
                  <span className='text-left'>{button.label}</span>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
