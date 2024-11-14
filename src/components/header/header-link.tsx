'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '#/lib/utils';

export default function HeaderLink(props: React.ComponentProps<typeof Link>) {
  const { children, href, ...rest } = props;
  const pathname = usePathname();
  const isCurrent = pathname.startsWith(href.toString());

  const c = cn(
    isCurrent ? 'border-border' : 'border-transparent',
    'rounded-md border px-2.5 py-1.5 text-sm opacity-70 transition-opacity hover:opacity-100'
  );

  return (
    <Link {...rest} href={href} className={c}>
      {children}
    </Link>
  );
}
