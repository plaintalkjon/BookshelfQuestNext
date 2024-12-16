import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const shelfService = {
  async getShelfBooks(userId: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data: shelfBooks } = await supabase
      .from('user_books')
      .select(`
        book_isbn,
        created_at,
      `)
      .eq('user_id', userId);
    
    return shelfBooks;
  }
};
