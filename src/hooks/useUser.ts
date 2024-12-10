import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error('Auth error:', authError);
        return null;
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')  // Make sure this matches your table name
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        return null;
      }

      return {
        ...user,
        ...profile
      };
    },
  });
};
