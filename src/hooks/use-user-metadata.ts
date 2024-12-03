import { type User } from '@supabase/supabase-js';
import { useState } from 'react';
import { useMount } from 'react-use';
import { createClient } from '#/lib/supabase/client';

export default function useUserMetadata() {
  const [userMetadata, setUserMetadata] = useState<User>();

  useMount(() => {
    const supabase = createClient();
    return supabase.auth.getSession().then((s) => {
      setUserMetadata(s.data.session?.user);
    });
  });

  return userMetadata;
}
