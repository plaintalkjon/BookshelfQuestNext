export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string;
          title: string;
          author: string;
          created_at: string;
          user_id: string;
          // Add more fields as needed
        };
        Insert: Omit<Database['public']['Tables']['books']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['books']['Insert']>;
      };
      // Add more tables as needed
    };
  };
} 