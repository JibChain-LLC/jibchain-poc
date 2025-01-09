import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '#/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center border border-transparent px-2.5 py-0.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-green-100 text-green-700',
        secondary: 'bg-gray-200 text-gray-700',
        destructive: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
        outline: 'border-gray-900 text-gray-900'
      },
      sz: {
        default: 'text-xs',
        lg: 'text-sm'
      },
      pill: {
        false: 'rounded',
        true: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      sz: 'default',
      pill: false
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, sz, pill, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, sz, pill }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
