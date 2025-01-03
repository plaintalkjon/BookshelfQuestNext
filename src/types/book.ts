export interface Book {
  isbn13?: string;
  title?: string;
  authors?: string[];
  publisher?: string;
  date_published?: string;
  synopsis?: string;
  image?: string;
  pages?: number;
  edition?: string;
  binding?: string;
  subjects?: string[];
  rating?: number;
  language?: string;
  editions?: Book[];
  excerpt?: string;
  related?: {type: string};
}

export interface SearchResponse {
  books: Book[];
  total: number;
}

// For pagination and search params
export interface BookCardParams {
  query: string;
  page?: number;
  limit?: number;
}