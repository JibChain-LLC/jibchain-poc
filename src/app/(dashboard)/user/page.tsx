import Loading from '#/app/(auth)/confirm/loading';
import AuthWrapper from '#/components/auth-wrapper';
import UserFormUpdate from './user-update/user-form';

export default function AccountPage() {
  return (
    <div className='h-screen overflow-y-auto bg-white text-black shadow-md'>
  <AuthWrapper fallback={<Loading />}>
        {({ user }) => {
          if (!user) return <Loading />;
          const transformedUser = {
            ...user,
            email: user.email || '',
            user_metadata: {
              firstName: user.user_metadata?.firstName || '',
              lastName: user.user_metadata?.lastName || '',
              jobRole: user.user_metadata?.jobRole || '',
            },
          };

          return <UserFormUpdate user={transformedUser} />;
        }}
      </AuthWrapper>
    </div>
  );
}
