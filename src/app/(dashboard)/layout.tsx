import 'server-only';

import { and, count, eq } from 'drizzle-orm';
import AuthWrapper from '#/components/auth-wrapper';
import Sidebar from '#/components/defaul-components/sidebar';
import { db } from '#/db';
import { profiles } from '#/db/schema/public';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;

  return (
    <div className='flex min-h-screen'>
      <AuthWrapper
        fallback={<div className='w-full px-8 py-5'>{children}</div>}>
        {async (props) => {
          const { user } = props;
          const {
            user_metadata: { firstName, lastName, jobRole }
          } = user;

          const [{ count: recordCount }] = await db
            .select({ count: count() })
            .from(profiles)
            .where(
              and(eq(profiles.id, user.id), eq(profiles.isSuperUser, true))
            );

          return (
            <>
              <Sidebar
                fullName={`${firstName} ${lastName}`}
                jobRole={jobRole}
                isSuperUser={recordCount > 0}
              />
              <div className='ml-16 w-full px-8 py-5'>{children}</div>
            </>
          );
        }}
      </AuthWrapper>
    </div>
  );
}
