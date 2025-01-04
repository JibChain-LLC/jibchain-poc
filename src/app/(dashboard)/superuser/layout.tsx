import { withAuthUser } from '#/components/auth-wrapper';
import 'server-only';

interface SuperuserLayoutProps {
  children: React.ReactNode;
}

export default withAuthUser<SuperuserLayoutProps>(
  async (props) => {
    const { children } = props;
    return <div className='h-[calc(100vh-2.5rem)]'>{children}</div>;
  },
  { requireSuperUser: true, redirectTo: '/' }
);
