import Link from 'next/link';
import { cn } from '#/lib/utils';

export default function NavLink(
  props: React.ComponentProps<typeof Link> & { isActive?: boolean }
) {
  const { children, className, isActive, ...rest } = props;

  return (
    <Link
      {...rest}
      className={cn(
        'border border-transparent border-b-gray-100 px-2.5 py-3 text-base font-normal transition-colors hover:rounded-md hover:bg-gray-100',
        isActive &&
          'pointer-events-none rounded-md border-gray-300 bg-gray-100',
        className
      )}>
      {children}
    </Link>
  );
}
