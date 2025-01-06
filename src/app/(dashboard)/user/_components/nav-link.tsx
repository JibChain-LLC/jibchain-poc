'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '#/lib/utils';

interface NavLinkProps {
  label: string;
  href: string;
}

export default function NavLink(props: NavLinkProps) {
  const { label, href } = props;
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'rounded-md border border-transparent p-3 text-base font-semibold transition-colors hover:bg-gray-100',
        pathname === href &&
          'pointer-events-none border-green-700 bg-green-50 text-green-700'
      )}>
      {label}
    </Link>
  );
}
