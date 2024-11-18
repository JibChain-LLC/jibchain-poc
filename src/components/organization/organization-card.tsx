import Image from 'next/image';
import React from 'react';
import ShellImage from '../../images/shell.svg';
import { Card, CardContent } from '../ui/card';

const OrganizationCard = () => {
  return (
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
  );
};

export default OrganizationCard;
