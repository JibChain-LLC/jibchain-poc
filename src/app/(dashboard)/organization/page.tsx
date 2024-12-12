import 'server-only';

import { and, eq } from 'drizzle-orm';
import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { withAuthUser } from '#/components/auth-wrapper';
import { db } from '#/db';
import { RoleEnum, roles } from '#/db/schema';
import { ROUTE_MAP } from '#/routes';
import { HydrateClient, trpc } from '#/trpc/query-clients/server';
import DeleteOrgDialog from './_components/delete-org-dialog';
import UserTable from './_components/user-table';

export const metadata: Metadata = {
  title: 'Organization'
};

export default withAuthUser(
  async (props) => {
    const { user } = props;

    const cookieStore = await cookies();
    const currentOrgId = cookieStore.get('current-org')?.value;
    if (!currentOrgId) return redirect('/');

    const [org, userRoles] = await Promise.all([
      trpc.org.read(currentOrgId),
      db
        .select({ role: roles.role })
        .from(roles)
        .where(and(eq(roles.orgId, currentOrgId), eq(roles.userId, user.id)))
        .then((q) => q.map((r) => r.role)),
      trpc.org.invite.list.prefetch({ orgId: currentOrgId }),
      trpc.org.member.list.prefetch({ orgId: currentOrgId })
    ]);

    if (!org) throw new Error('Invalid Organization');

    return (
      <HydrateClient>
        <div className='flex flex-col gap-3'>
          <div className='flex items-end justify-between'>
            <p className='text-2xl font-bold leading-none text-gray-900'>
              My Team
            </p>
            {userRoles.includes(RoleEnum.OWNER) && (
              <DeleteOrgDialog orgName={org.name} orgId={org.id} />
            )}
          </div>
          <UserTable
            orgId={currentOrgId}
            orgName={org.name}
            currentUserEmail={user.email!}
            currentUserRoles={userRoles}
          />
        </div>
      </HydrateClient>
    );
  },
  { redirectTo: ROUTE_MAP.LOGIN }
);
