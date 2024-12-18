import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const shelfService = {
  getShelfBooks: async (userId: string) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('shelf_books')
      .select(`
        *
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  }
}; 