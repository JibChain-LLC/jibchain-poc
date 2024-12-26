
import Loading from '#/app/(auth)/confirm/loading';
import AuthWrapper from '#/components/auth-wrapper';
import UserFormUpdate from './user-update/user-form';

export default function AccountPage() {

  return (
    <div className='h-screen overflow-y-auto bg-white text-black shadow-md'>
    <AuthWrapper fallback={<Loading/>}>
            {({ user }) => {
              return(
                <UserFormUpdate user={user}/>
              )
            }}
    </AuthWrapper>
    </div>
  );
}
