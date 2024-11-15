import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import ShellImage from '../../images/shell.svg';

const OrganizationCard = () => {
  return (
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
  );
};

export default OrganizationCard;
