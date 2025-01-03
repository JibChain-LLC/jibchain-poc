import 'server-only';

import { type Metadata } from 'next';
import { type ReactNode } from 'react';

type LogoutLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = {
  title: 'Logout'
};

export default async function LogoutLayout(props: LogoutLayoutProps) {
  const { children } = props;
  return <>{children}</>;
}
