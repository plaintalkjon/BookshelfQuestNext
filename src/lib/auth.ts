import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function auth() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session }, error } = await supabase.auth.getSession();
  
  console.log('Session retrieval:', {
    sessionExists: !!session,
    sessionData: session,
    error: error?.message
  });

  return session;
} 