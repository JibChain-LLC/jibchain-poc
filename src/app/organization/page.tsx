import 'server-only';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query';
import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { withAuthUser } from '#/components/auth-wrapper';
import getInvites from '#/lib/actions/invite/read-invite-list';
import getOrganization from '#/lib/actions/organization/read-org';
import getOrgMembers from '#/lib/actions/organization/read-org-members';
import getUserCurrentOrg from '#/lib/actions/shared/get-current-org';
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

    const [org] = await Promise.all([
      getOrganization(currentOrgId),
      queryClient.prefetchQuery({
        queryKey: ['invites', { orgId: currentOrgId }],
        queryFn: () => getInvites({ orgId: currentOrgId })
      }),
      queryClient.prefetchQuery({
        queryKey: ['members', { orgId: currentOrgId }],
        queryFn: () => getOrgMembers({ orgId: currentOrgId })
      })
    ]);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex flex-col gap-4 p-4'>
          <p className='text-5xl font-bold'>{org?.name}</p>
          <p className='w-fit rounded-sm border border-border bg-muted/50 px-1 py-0.5 font-mono'>
            {currentOrgId}
          </p>
          <div className='flex flex-col gap-5'>
            <UserTable orgId={currentOrgId} currentUserEmail={user.email!} />
          </div>
        </div>
      </HydrationBoundary>
    );
  },
  { redirectTo: '/login' }
);
