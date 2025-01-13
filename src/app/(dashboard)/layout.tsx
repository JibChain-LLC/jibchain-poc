import 'server-only';

import AuthWrapper from '#/components/auth-wrapper';
import Sidebar from '#/components/defaul-components/sidebar';
import { db } from '#/db';

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

          const profile = await db.query.profiles.findFirst({
            where: (p, { eq }) => eq(p.id, user.id)
          });
          if (!profile) return null;

          return (
            <>
              <Sidebar
                fullName={`${profile.firstName} ${profile.lastName}`}
                jobRole={profile.jobRole!}
                isSuperUser={profile.isSuperUser ?? false}
              />
              <div className='ml-16 w-full px-8 py-5'>{children}</div>
            </>
          );
        }}
      </AuthWrapper>
    </div>
  );
}
