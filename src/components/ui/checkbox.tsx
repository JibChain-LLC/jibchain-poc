'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '#/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-gray-300 bg-gray-50 ring-offset-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-green-700 data-[state=checked]:bg-green-700 data-[state=checked]:text-white',
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator
      className={cn(
        'flex items-center justify-center text-current transition-all duration-150'
      )}>
      <Check className='size-4' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
