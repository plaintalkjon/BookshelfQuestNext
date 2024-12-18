import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import { useAuth } from './useAuth';
import { isbndbService } from '@/services/isbndb';
export function useShelf() {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient();
  const { user } = useAuth();

  // Query to get shelf books
  const { data: shelfBooks, isLoading } = useQuery({
    queryKey: ['shelfBooks', user?.id],
    queryFn: async () => {
      const { data: shelfEntries, error } = await supabase
        .from('user_shelf')
        .select(`*`)
        .eq('user_id', user?.id);
      if (error) throw error;

      const bookDetails = await isbndbService.getBooksInBatch(
        shelfEntries.map(entry => entry.book_isbn13)
      );

      return shelfEntries.map((entry, index) => ({
        ...entry,
        book: bookDetails[index]
      }));
    },
    enabled: !!user
  });

  // Mutation to add book
  const addToShelf = useMutation({
    mutationFn: async (book_isbn13: string) => {
      const { error } = await supabase
        .from('user_shelf')
        .insert({ user_id: user!.id, book_isbn13: book_isbn13 });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelfBooks'] });
      toast.success('Book added to shelf');
    }
  });

  // Mutation to remove book
  const removeFromShelf = useMutation({
    mutationFn: async (book_isbn13: string) => {
      const { error } = await supabase
        .from('user_shelf')
        .delete()
        .match({ user_id: user!.id, book_isbn13: book_isbn13 });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelfBooks'] });
      toast.success('Book removed from shelf');
    }
  });

  return {
    shelfBooks,
    isLoading,
    addToShelf,
    removeFromShelf,
    isInShelf: (bookId: string) => shelfBooks?.some(book => book.book_id === bookId)
  };
}