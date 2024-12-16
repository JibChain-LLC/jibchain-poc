'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '#/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    icon: LucideIcon;
  }
>(({ className, children, icon: Icon, ...rest }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        'group/item flex items-start gap-3.5',
        'relative z-0 after:absolute after:left-[15px] after:top-8 after:-z-10 after:h-full after:w-0.5 after:bg-gray-100 after:content-[""] last:after:hidden',
        className
      )}
      {...rest}>
      <div className='flex h-24 items-center justify-center'>
        <div className='size-fit rounded-full bg-gray-100 p-2 text-gray-600 transition-colors group-data-[state="open"]/item:bg-green-100 group-data-[state="open"]/item:text-green-800'>
          <Icon size={16} />
        </div>
      </div>

      <div className='mb-3 w-full rounded-lg transition-colors group-data-[state="open"]/item:bg-gray-100'>
        {children}
      </div>
    </AccordionPrimitive.Item>
  );
});
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    title: string;
    subTitle: string;
  }
>(({ className, children: _, title, subTitle, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex h-24 flex-1 items-center justify-between rounded-lg px-7 py-[22px] font-medium transition-all hover:bg-gray-100 [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}>
      <div className='flex flex-col items-start'>
        <p className='text-sm leading-tight text-gray-500'>{title}</p>
        <p className='text-xl font-normal group-data-[state="open"]/item:font-semibold'>
          {subTitle}
        </p>
      </div>
      <ChevronDown className='size-7 shrink-0 transition-transform duration-200' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden px-7 pb-4 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}>
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
