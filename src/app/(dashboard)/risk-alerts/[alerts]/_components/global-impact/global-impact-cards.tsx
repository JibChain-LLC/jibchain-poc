import React from 'react';
import { cn } from '#/lib/utils';
interface ImpactCardProps {
  title: string;
  subTitle: string | number;
  active?: boolean;
  className?: React.ComponentProps<'div'>['className'];
}

export default function ImpactCard(props: ImpactCardProps) {
  const { title, subTitle, active = false, className } = props;

  return (
    <div
      className={cn(
        'relative flex flex-col gap-1 rounded-lg border border-transparent bg-gray-50 px-8 py-5',
        active && 'border-green-700 bg-green-50',
        className,
        active &&
          'after:absolute after:bottom-0 after:left-1/2 after:size-5 after:origin-[0%_100%] after:-translate-x-1/2 after:rotate-45 after:rounded-br-lg after:border after:border-green-700 after:border-l-transparent after:border-t-transparent after:bg-green-50 after:content-[""]'
      )}>
      <p
        className={cn(
          'text-base font-normal leading-tight text-gray-600',
          active && 'text-green-800'
        )}>
        {title}
      </p>
      <p
        className={cn(
          'text-3xl font-bold leading-tight text-gray-900',
          active && 'text-green-800'
        )}>
        {subTitle}
      </p>
    </div>
  );
}
