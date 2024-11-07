import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { withAuthUser } from '#/components/auth-wrapper';
import { db } from '#/db';
import { users } from '#/db/auth-schema';
import { invites, organizations } from '#/db/schema';

interface JoinPageProps {
  searchParams: Promise<{ inviteId: string }>;
}

export default withAuthUser<JoinPageProps>(
  async (props) => {
    const { user, searchParams } = props;
    const inviteId = (await searchParams).inviteId;

    const [invite] = await db
      .select({
        invite: invites,
        org: organizations,
        invitingUser: users
      })
      .from(invites)
      .where(eq(invites.id, inviteId))
      .innerJoin(organizations, eq(organizations.id, invites.orgId))
      .innerJoin(users, eq(users.id, invites.inviterId));

    if (!invite) redirect('/');

    console.log(invite);

    return (
      <div>
        <p>
          {invite.invitingUser.email} has invited you to join{' '}
          <b>{invite.org.name}</b> organization
        </p>
      </div>
    );
  },
  { redirectTo: '/' }
);
