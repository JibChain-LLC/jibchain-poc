import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { cn } from '#/lib/utils';
import { overviewCardData } from '#/utils/utils';
import { Card, CardHeader, CardTitle } from '../ui/card';

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
      {/* {overviewCardData.map((item, i) => (
        <Card
          className='rounded-md border border-transparent bg-transparent shadow-md transition-all duration-500 hover:border-green-400 hover:text-green-700 hover:shadow-lg'
          key={i}>
          <CardHeader className='flex w-full flex-row items-center justify-between rounded-lg border-none bg-gray-100 p-0 hover:bg-green-50'>
            <CardTitle className='w-1/2 p-5 text-xl font-medium'>
              <span className='flex flex-col'>
                <span className='text-nowrap'>{item.title}</span>
                <span className='text-[32px] font-bold'>{item.value}</span>
              </span>
            </CardTitle>
            <div className='flex items-center justify-end'>
              <Image
                src={item.icon}
                alt={item.alt}
                className='mask-gradient h-[150px] w-full object-cover opacity-40'
                width={400}
                height={400}
              />
            </div>
          </CardHeader>
        </Card>
      ))} */}
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
