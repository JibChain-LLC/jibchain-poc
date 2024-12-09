import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { cn } from '#/lib/utils';
import { overviewCardData } from '#/utils/utils';

interface OverviewCardProps {
  header: string;
  subHeader: string;
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
}

function OverviewCard(props: OverviewCardProps) {
  const { header, subHeader, className, onClick, src, alt } = props;

  return (
    <div
      className={cn(
        'relative box-border overflow-hidden rounded-lg border border-transparent bg-gray-100 px-8 py-9',
        onClick &&
          'transition-colors hover:cursor-pointer hover:border-green-500 hover:bg-green-50 hover:text-green-900 [&>*]:hover:text-green-900 [&>svg]:hover:right-2',
        className
      )}>
      <p className='text-base font-normal leading-tight text-gray-600'>
        {header}
      </p>
      <p className='text-3xl font-bold leading-tight'>{subHeader}</p>
      {src && (
        <Image
          src={src}
          alt={alt!}
          className='mask-gradient absolute right-0 top-0 h-full w-1/2 select-none object-cover opacity-40'
          width={324}
          height={264}
        />
      )}
      {onClick && (
        <ArrowRight
          size={30}
          className='absolute inset-y-0 right-4 m-auto text-gray-300 transition-all'
        />
      )}
    </div>
  );
}

const OverviewCardComponent = () => {
  return (
    <div className='mt-5 grid grid-cols-1 gap-4 rounded-none lg:grid-cols-2 xl:grid-cols-3'>
      <OverviewCard
        header={overviewCardData[0].title}
        src={overviewCardData[0].icon}
        alt={overviewCardData[0].alt}
        subHeader={overviewCardData[0].value}
      />
      <OverviewCard
        header={overviewCardData[1].title}
        subHeader={overviewCardData[1].value}
        src={overviewCardData[1].icon}
        alt={overviewCardData[1].alt}
      />
      <OverviewCard
        header={overviewCardData[2].title}
        subHeader={overviewCardData[2].value}
        onClick={() => null}
      />
    </div>
  );
};

export default OverviewCardComponent;
