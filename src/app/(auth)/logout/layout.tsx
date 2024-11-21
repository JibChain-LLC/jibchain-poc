import 'server-only';

import { type Metadata } from 'next';
import { type ReactNode } from 'react';
import { withAuthUser } from '#/components/auth-wrapper';

type LogoutLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = {
  title: 'Logout'
};

export default withAuthUser<LogoutLayoutProps>(
  function LogoutLayout(props) {
    const { children } = props;
    return <>{children}</>;
  },
  { redirectTo: '/login' }
);
