'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '#/lib/utils';

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function SideNavItem(props: React.ComponentProps<typeof Link>) {
  const { children, href, ...rest } = props;
  const pathname = usePathname();

  const isCurrent = href === pathname;

  const c = cn(
    isCurrent ? 'opacity-100' : 'opacity-65',
    'border-b border-border p-3 text-sm font-semibold uppercase transition-all hover:bg-secondary'
  );

  return (
    <Link {...rest} href={href} className={c}>
      {children}
    </Link>
  );
}

function SideNav() {
  return (
    <nav className='sticky top-[4.5rem] flex h-[calc(100vh-4.5rem)] flex-col border-r border-border'>
      <SideNavItem href={'/dashboard'}>Dashboard</SideNavItem>
    </nav>
  );
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;

  return (
    <div className='grid h-full grid-cols-[200px_1fr]'>
      <SideNav />
      <div>{children}</div>
    </div>
  );
}
