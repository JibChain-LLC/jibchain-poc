import { and, eq } from 'drizzle-orm';
import { Metadata } from 'next';
import Link from 'next/link';
import { withAuthUser } from '#/components/auth-wrapper';
import { Button } from '#/components/ui/button';
import { db } from '#/db';
import { roles } from '#/db/schema/public';
import { RoleEnum } from '#/enums';
import CreateOrgForm from './_components/create-org-form';

export const metadata: Metadata = {
  title: 'Create Organization'
};

export default withAuthUser(
  async function CreateOrgPage(props) {
    const { user } = props;

    const ownerCount = await db.$count(
      roles,
      and(eq(roles.userId, user.id), eq(roles.role, RoleEnum.OWNER))
    );

    if (ownerCount > 0)
      return (
        <div className='w-[500px] text-center'>
          <h3 className='mb-2 text-center text-2xl font-bold leading-tight'>
            You are already the owner of an existing organization
          </h3>
          <p className='mb-4'>
            You can only be the owner of one organization at a time.
          </p>
          <Button asChild className='w-full'>
            <Link href='/organization'>Go to organization</Link>
          </Button>
        </div>
      );

    return (
      <div>
        <h3 className='mb-6 text-center text-2xl font-bold leading-tight'>
          Create Organization
        </h3>
        <CreateOrgForm />
      </div>
    );
  },
  { redirectTo: '/' }
);
