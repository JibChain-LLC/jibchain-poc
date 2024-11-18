import 'server-only';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query';
import { and, eq } from 'drizzle-orm';
import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { withAuthUser } from '#/components/auth-wrapper';
import { db } from '#/db';
import { RoleEnum, roles } from '#/db/schema';
import getInvites from '#/lib/actions/invite/read-invite-list';
import getOrganization from '#/lib/actions/organization/read-org';
import getOrgMembers from '#/lib/actions/organization/read-org-members';
import getUserCurrentOrg from '#/lib/actions/shared/get-current-org';
import DeleteOrgDialog from './_components/delete-org-dialog';
import UserTable from './_components/user-table';

export const metadata: Metadata = {
  title: 'Organization'
};

export default withAuthUser(
  async (props) => {
    const { user } = props;

    const queryClient = new QueryClient();
    const currentOrgId =
      (await cookies()).get('current-org')?.value ??
      (await getUserCurrentOrg(user.id));

    if (!currentOrgId) return redirect('/');

    const [org, userRoles] = await Promise.all([
      getOrganization(currentOrgId),
      db
        .select({ role: roles.role })
        .from(roles)
        .where(and(eq(roles.orgId, currentOrgId), eq(roles.userId, user.id)))
        .then((q) => q.map((r) => r.role)),
      queryClient.prefetchQuery({
        queryKey: ['invites', { orgId: currentOrgId }],
        queryFn: () => getInvites({ orgId: currentOrgId })
      }),
      queryClient.prefetchQuery({
        queryKey: ['members', { orgId: currentOrgId }],
        queryFn: () => getOrgMembers({ orgId: currentOrgId })
      })
    ]);

    if (!org) throw new Error('Invalid Organization');

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex flex-col gap-4 p-4'>
          <div className='w-fit rounded-md border p-4'>
            <p className='text-sm font-bold'>{org.name}</p>
            <p className='text-sm leading-5'>
              Member since {org.dateCreated.getFullYear()}
            </p>
          </div>

          <p className='w-fit rounded-sm border px-1 py-0.5 font-mono'>
            {currentOrgId}
          </p>
          {userRoles.includes(RoleEnum.OWNER) && (
            <DeleteOrgDialog orgName={org.name} orgId={org.id} />
          )}
          <UserTable
            orgId={currentOrgId}
            currentUserEmail={user.email!}
            currentUserRoles={userRoles}
          />
        </div>
      </HydrationBoundary>
    );
  },
  { redirectTo: '/login' }
);
