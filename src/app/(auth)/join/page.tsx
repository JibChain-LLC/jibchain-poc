import { eq } from 'drizzle-orm';
import { Shield } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AuthWrapper from '#/components/auth-wrapper';
import { db } from '#/db';
import { invites, organizations } from '#/db/schema/public';
import NoUser from './_components/no-user';
import NotUser from './_components/not-user';
import SameUser from './_components/same-user';

interface JoinOrgPageProps {
  searchParams: Promise<{ inviteId: string }>;
}

export const metadata: Metadata = {
  title: 'Join Team'
};

export default async function JoinOrgPage(props: JoinOrgPageProps) {
  const { searchParams } = props;
  const inviteId = (await searchParams).inviteId;
  const [invite] = await db
    .select({
      invite: invites,
      org: organizations
    })
    .from(invites)
    .where(eq(invites.id, inviteId))
    .innerJoin(organizations, eq(organizations.id, invites.orgId))
    .catch(() => [undefined]);

  if (!invite) return redirect('/');

  return (
    <div className='flex w-[32rem] flex-col items-center'>
      <Shield fill='currentColor' className='mb-3.5 text-green-400' />
      <p className='text-sm font-medium text-gray-600'>
        You have been invite to join:
      </p>
      <p className='mb-7 text-2xl font-semibold'>{invite.org.name}</p>
      <AuthWrapper fallback={<NoUser />}>
        {(props) => {
          const { user } = props;
          const sameUser = user.email === invite.invite.email;
          return sameUser ? (
            <SameUser inviteId={invite.invite.id} />
          ) : (
            <NotUser email={user.email!} />
          );
        }}
      </AuthWrapper>
    </div>
  );
}
