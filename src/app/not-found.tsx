import Image from 'next/image';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6'>
      <h1 className='text-[20px] font-bold text-green-600'>
        404 PAGE NOT FOUND
      </h1>
      <p className='mb-6 text-center text-[36px] text-black font-semibold'>
        Doh! This page doesn't exist.
      </p>

      <Image
        src='/error404.jpg'
        alt='Error illustration'
        width={300}
        height={300}
        className='h-auto w-auto'
      />

      <Image
        src='/greenlogo.svg'
        alt='Coeus logo'
        width={220}
        height={220}
        className='absolute bottom-0 mb-12'
      />
    </div>
  );
};

export default NotFoundPage;
