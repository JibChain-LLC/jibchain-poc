import { eq } from 'drizzle-orm';
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
  title: 'Join'
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
    .catch(() => []);

  if (!invite) return redirect('/');

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='h-auto w-96 rounded-md border'>
        <div className='flex flex-col gap-2 border-b p-4 text-center'>
          <p>You have been invited to join</p>
          <p className='text-4xl font-bold'>{invite.org.name}</p>
        </div>
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
    </div>
  );
}
