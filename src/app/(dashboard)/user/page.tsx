import 'server-only';

import { withAuthUser } from '#/components/auth-wrapper';
import { HydrateClient, trpc } from '#/trpc/query-clients/server';
import UpdateUserForm from './_components/update-user-form';

export default withAuthUser(
  async function AccountPage(props) {
    const { user } = props;

    await trpc.user.read.prefetch(user.id);

    return (
      <HydrateClient>
        <div className='flex px-6 py-12 lg:px-12 xl:px-32'>
          <UpdateUserForm uid={user.id} />
        </div>
      </HydrateClient>
    );
  },
  { redirectTo: '/' }
);
