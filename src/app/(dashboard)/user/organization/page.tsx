import 'server-only';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { withAuthUser } from '#/components/auth-wrapper';
import { RoleEnum } from '#/enums';
import authCheck from '#/lib/server/shared/auth-check';
import { HydrateClient, trpc } from '#/trpc/query-clients/server';
import OrganizationComponent from './_components/organization-component';

export const metadata: Metadata = {
  title: 'Update Organization'
};

export default withAuthUser(async function UserOrganization(props) {
  const { user } = props;

  const cookieStore = await cookies();
  const currOrgId = cookieStore.get('current-org')?.value;
  if (!currOrgId) throw Error('No current organization');

  const { ok } = await authCheck({
    user,
    orgId: currOrgId,
    rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
  });

  if (!ok) redirect('/user');

  await trpc.org.read.prefetch(currOrgId);

  return (
    <HydrateClient>
      <div className='flex px-6 py-12 lg:px-12 xl:px-32'>
        <OrganizationComponent orgId={currOrgId} />
      </div>
    </HydrateClient>
  );
});
