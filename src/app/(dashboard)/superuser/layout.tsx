import { withAuthUser } from '#/components/auth-wrapper';
import 'server-only';

interface SuperuserLayoutProps {
  children: React.ReactNode;
}

export default withAuthUser<SuperuserLayoutProps>(
  async (props) => {
    const { children } = props;
    return <>{children}</>;
  },
  { requireSuperUser: true, redirectTo: '/' }
);
