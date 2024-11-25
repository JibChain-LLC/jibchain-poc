import 'server-only';

import { redirect } from 'next/navigation';
import Sidebar from '#/components/defaul-components/sidebar';
import { createClient } from '#/lib/supabase/server';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;

  const supabase = await createClient();
  const {
    error,
    data: { user }
  } = await supabase.auth.getUser();

  if (error || !user) redirect('/logout');

  const { firstName, lastName, jobRole } = user.user_metadata;

  return (
    <div className='flex min-h-screen'>
      <Sidebar fullName={`${firstName} ${lastName}`} jobRole={jobRole} />
      <div className='ml-16 w-full px-8 py-5 bg-gray-100'>{children}</div>
    </div>
  );
}
