'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '#/components/ui/button';
import ShellImage from '#/images/shell.svg';
import { buttons } from '#/utils/utils';
import { Card, CardContent } from '../ui/card';

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
    <div className='ml-14 flex h-screen min-w-[400px] max-w-[400px] flex-col bg-gray-100 p-6'>
      <div className='flex w-full grow flex-col gap-4'>
        <Card className='flex min-h-[100px] w-full items-center border-none bg-white shadow-md'>
          <CardContent className='flex items-center gap-12 p-4 text-black'>
            <Image
              src={ShellImage}
              alt='Shell Logo'
              className='size-[100px] rounded-md object-cover'
            />
            <div>
              <h2 className='text-xl font-bold'>Shell USA, Inc.</h2>
              <p className='text-gray-500'>Member since 2024</p>
            </div>
          </CardContent>
        </Card>
        <Card className='mt-4 grow rounded-lg border-t-0 border-gray-200 bg-white shadow-md'>
          <CardContent className='flex flex-col space-y-2 p-4'>
            {buttons.map((button) => (
              <Link key={button.label} href={button.href} passHref>
                <Button
                  onClick={() => setSelectedButton(button.label)}
                  className={`w-full justify-start py-6 text-left text-[18px] ${
                    selectedButton === button.label
                      ? 'border border-green-700 bg-green-50 font-semibold text-green-700'
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
