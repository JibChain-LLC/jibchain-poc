import 'server-only';

import type { Metadata } from 'next';
import { HydrateClient, trpc } from '#/trpc/query-clients/server';
import UpdateUserForm from './_components/update-user-form';

export const metadata: Metadata = {
  title: 'Update Account'
};

export default async function AccountPage() {
  await trpc.user.read.prefetch();

  return (
    <HydrateClient>
      <div className='flex px-6 py-12 lg:px-12 xl:px-32'>
        <UpdateUserForm />
      </div>
    </HydrateClient>
  );
}
