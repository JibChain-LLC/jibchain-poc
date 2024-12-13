'use client';

import Image from 'next/image';
import React, { createElement } from 'react';
import { cn } from '#/lib/utils';

interface OverviewCardProps {
  header: string;
  subHeader: string;
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
}

export default function OverviewCard(props: OverviewCardProps) {
  const { header, subHeader, className, onClick, src, alt } = props;

  return createElement(
    onClick ? 'button' : 'div',
    {
      className: cn(
        'relative box-border overflow-hidden rounded-lg border border-transparent bg-gray-100 px-8 py-9 text-left',
        onClick &&
          'group/card transition-colors hover:cursor-pointer hover:border-green-500 hover:bg-green-50 focus:outline-none focus-visible:border-green-500 focus-visible:bg-green-50',
        className
      ),
      onClick
    },
    <>
      <p className='text-base font-normal leading-tight text-gray-600 group-hover/card:text-green-900 group-focus-visible/card:text-green-900'>
        {header}
      </p>
      <p className='text-3xl font-bold leading-tight group-hover/card:text-green-900 group-focus-visible/card:text-green-900'>
        {subHeader}
      </p>
      {src && (
        <Image
          src={src}
          alt={alt!}
          className='mask-gradient absolute right-0 top-0 h-full w-1/2 select-none object-cover opacity-40'
          width={324}
          height={264}
        />
      )}
    </>
  );
}
