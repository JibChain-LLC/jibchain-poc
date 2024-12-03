import 'server-only';

import AuthWrapper from '#/components/auth-wrapper';
import Sidebar from '#/components/defaul-components/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;

  return (
    <div className='flex min-h-screen'>
      <AuthWrapper
        fallback={<div className='w-full px-8 py-5'>{children}</div>}>
        {(props) => {
          const { user } = props;
          const {
            user_metadata: { firstName, lastName, jobRole }
          } = user;

          return (
            <>
              <Sidebar
                fullName={`${firstName} ${lastName}`}
                jobRole={jobRole}
              />
              <div className='ml-16 w-full px-8 py-5'>{children}</div>
            </>
          );
        }}
      </AuthWrapper>
    </div>
  );
}
