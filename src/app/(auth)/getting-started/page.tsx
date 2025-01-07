import { eq } from 'drizzle-orm';
import { Building, Shield } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { withAuthUser } from '#/components/auth-wrapper';
import { Button } from '#/components/ui/button';
import { db } from '#/db';
import { invites, organizations } from '#/db/schema/public';
import getUserCurrentOrg from '#/lib/server/shared/get-current-org';

export default withAuthUser(
  async function NoMemberPage(props) {
    const { user } = props;

    const alreadyUser = (await getUserCurrentOrg(user.id)) !== '';
    if (alreadyUser) return redirect('/dashboard');

    const pendingInv = await db
      .select({
        id: invites.id,
        orgName: organizations.name
      })
      .from(invites)
      .where(eq(invites.email, user.email!))
      .innerJoin(organizations, eq(organizations.id, invites.orgId));

    return (
      <div className='flex w-[32rem] flex-col items-center'>
        {pendingInv.length === 0 && (
          <>
            <Building className='mb-3.5 text-green-400' />
            <p className='mb-1 text-2xl font-bold leading-tight'>
              Create a new organization
            </p>
            <p className='mb-6 text-sm font-medium text-gray-600'>
              You are currently not a member of any organization
            </p>
            <Button asChild className='w-full'>
              <Link href='/organization/create'>Create New</Link>
            </Button>
          </>
        )}
        {pendingInv.length > 0 && (
          <>
            <Shield fill='currentColor' className='mb-3.5 text-green-400' />
            <p className='mb-3.5 text-2xl font-bold leading-tight'>
              Welcome to COEUS
            </p>
            <p className='mb-6 text-sm font-medium text-gray-600'>
              You have been invited to join:
            </p>
            {pendingInv.map((invite) => {
              const { id, orgName } = invite;

              return (
                <Button asChild key={id} className='w-full'>
                  <Link href={`/join?inviteId=${encodeURIComponent(id)}`}>
                    Join {orgName}
                  </Link>
                </Button>
              );
            })}
            <p className='my-4 text-sm font-medium text-gray-600'>or</p>
            <Button asChild className='w-full' variant={'outline'}>
              <Link href='/organization/create'>Create a New Organization</Link>
            </Button>
          </>
        )}
      </div>
    );
  },
  { redirectTo: '/' }
);
