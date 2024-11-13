import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { withAuthUser } from '#/components/auth-wrapper';
import { db } from '#/db';
import { invites, organizations } from '#/db/schema';

export default withAuthUser(
  async function NoMemberPage(props) {
    const { user } = props;
    const pendingInv = await db
      .select({
        id: invites.id,
        orgName: organizations.name
      })
      .from(invites)
      .where(eq(invites.email, user.email!))
      .innerJoin(organizations, eq(organizations.id, invites.orgId));

    return (
      <div className='flex size-full items-center justify-center'>
        <div className='w-fit max-w-96 rounded-md border border-border text-center'>
          <p className='border-b border-border p-4 text-2xl font-bold'>
            You currently are not a member of any organization
          </p>
          <div className='flex flex-col gap-3 p-4'>
            {pendingInv.length > 0 && (
              <>
                <p>You have pending invites to:</p>
                {pendingInv.map(({ id, orgName }) => (
                  <Link
                    className='font-bold hover:underline'
                    href={`/organization/join?inviteId=${encodeURIComponent(id)}`}
                    key={id}>
                    {orgName}
                  </Link>
                ))}
                <p>or</p>
              </>
            )}
            <Link href='create' className='font-bold hover:underline'>
              Create a new organization
            </Link>
          </div>
        </div>
      </div>
    );
  },
  { redirectTo: '/' }
);
