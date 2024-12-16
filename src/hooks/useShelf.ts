import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from './useAuth';

export const useShelf = () => {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient();

  // Query to track shelf contents
  const { data: shelfItems } = useQuery({
    queryKey: ['shelf'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_shelf')
        .select('*');
      if (error) throw error;
      return data;
    },
    // Only fetch if we have a user
    enabled: !!useAuth().user
  });

  const addToShelf = useMutation({
    mutationFn: async (bookIsbn: string) => {
      const { error } = await supabase
        .from('user_shelf')
        .insert({ book_isbn: bookIsbn });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelf'] });
    }
  });

  const removeFromShelf = useMutation({
    mutationFn: async (bookIsbn: string) => {
      const { error } = await supabase
        .from('user_shelf')
        .delete()
        .eq('book_isbn', bookIsbn);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelf'] });
    }
  });

  return {
    shelfItems,
    addToShelf,
    removeFromShelf,
    isInShelf: (isbn: string) => shelfItems?.some(item => item.book_isbn === isbn)
  };
};