import 'server-only';

import { redirect } from 'next/navigation';
import { createClient } from '#/lib/supabase/server';
import { AuthWrapperProps } from './types';

/**
 * Server component that wraps content requiring user session
 *
 * If no user session is available fallback to supplied prop
 */
export default async function AuthWrapper(props: AuthWrapperProps) {
  const { children } = props;
  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (!user || error) {
    if ('fallback' in props) {
      if (typeof props.fallback === 'function') return <props.fallback />;
      else return <>{props.fallback}</>;
    } else if ('redirectTo' in props) return redirect(props.redirectTo);
    else return null;
  }

  return <>{typeof children === 'function' ? children({ user }) : children}</>;
}
