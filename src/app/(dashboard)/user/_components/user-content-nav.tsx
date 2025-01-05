import 'server-only';

import { fa } from '@faker-js/faker';
import { LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { withAuthUser } from '#/components/auth-wrapper';
import { Card, CardContent } from '#/components/ui/card';
import { RoleEnum } from '#/enums';
import authCheck from '#/lib/server/shared/auth-check';
import NavLink from './nav-link';

export const buttons = [
  { label: 'Account', href: '/user' },
  // { label: 'Billing & Subscription', href: '/user/billing' },
  // { label: 'Notifications', href: '/user/notifications' },
  { label: 'Organization', href: '/user/organization', admin: true }
];

export default withAuthUser(async function UserContentNav(props) {
  const { user } = props;

  const cookieStore = await cookies();
  const currOrgId = cookieStore.get('current-org')?.value;

  const isAdmin = currOrgId
    ? (
        await authCheck({
          user,
          orgId: currOrgId,
          rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
        })
      ).ok
    : false;

  return (
    <Card className='grow overflow-y-auto'>
      <CardContent className='flex flex-col gap-2'>
        {buttons.map(({ label, href, admin = false }) => {
          if (admin && !isAdmin) return null;
          return <NavLink label={label} key={label} href={href} />;
        })}

        <Link
          href={'/logout'}
          className='flex flex-row items-center justify-between rounded-md border border-transparent p-3 text-base font-semibold text-red-700 transition-colors hover:border-red-700 hover:bg-red-50'>
          Logout
          <LogOut size={20} />
        </Link>
      </CardContent>
    </Card>
  );
});
