import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/lib/supabase";

export const useUser = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (!session) return null;
      
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      return profile;
    }
  });

  return {
    ...query,
    mutate: () => queryClient.invalidateQueries({ queryKey: ['user'] })
  };
};
